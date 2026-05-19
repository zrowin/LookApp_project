const path = require('path');
const sharp = require('sharp');

const mockUploads = [];

jest.resetModules();

// Mock thumbnail and supabase modules before loading the route so imports are mocked
jest.mock(path.resolve(__dirname, '../src/lib/images/thumbnail.ts'), () => ({
  __esModule: true,
  default: async (buffer, size) => Buffer.from('thumb'),
}));

jest.mock(path.resolve(__dirname, '../src/lib/supabase/server.ts'), () => ({
  __esModule: true,
  default: {
    storage: {
      from: () => ({
        upload: async (p, data, opts) => {
          mockUploads.push({ path: p, data, opts });
          return { error: null };
        },
        getPublicUrl: (p) => ({ data: { publicUrl: `https://cdn.test/${p}` } }),
      }),
    },
    from: () => ({ insert: async () => ({}) }),
  },
}));

const routeMod = require(path.resolve(__dirname, '../src/app/api/upload/route.ts'));
const { handleUpload } = routeMod;

describe('Upload API integration (mocked Supabase)', () => {
  beforeEach(() => {
    mockUploads.length = 0;
  });

  test('handleUpload stores file and returns urls', async () => {
    const sampleBase64 = (
      await sharp({
        create: {
          width: 20,
          height: 20,
          channels: 3,
          background: '#ffffff',
        },
      })
        .jpeg()
        .toBuffer()
    ).toString('base64');
    const res = await handleUpload({
      filename: 'test.jpg',
      fileBase64: sampleBase64,
      removeBg: false,
    });

    expect(res).toBeDefined();
    expect(res.id).toBeTruthy();
    expect(res.url).toContain('https://cdn.test');
    expect(res.thumbnailUrl).toContain('https://cdn.test');
  });

  test('handleUpload stores original image with max dimension of 500px', async () => {
    const source = await sharp({
      create: {
        width: 2400,
        height: 1600,
        channels: 3,
        background: '#ffffff',
      },
    })
      .jpeg()
      .toBuffer();

    await handleUpload({
      filename: 'large.jpg',
      fileBase64: source.toString('base64'),
      contentType: 'image/jpeg',
      removeBg: false,
    });

    const originalUpload = mockUploads.find((upload) => !upload.path.endsWith('/thumbnail.webp'));
    const metadata = await sharp(originalUpload.data).metadata();

    expect(Math.max(metadata.width, metadata.height)).toBeLessThanOrEqual(500);
    expect(metadata.width).toBe(500);
    expect(metadata.height).toBe(333);
  });
});
