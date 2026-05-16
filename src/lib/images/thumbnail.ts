import sharp from 'sharp'

export async function createThumbnail(buffer: Buffer, size = 400) {
  return await sharp(buffer)
    .resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer()
}

export default createThumbnail
