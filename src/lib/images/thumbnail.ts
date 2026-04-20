import sharp from 'sharp'

export async function createThumbnail(buffer: Buffer, size = 400) {
  return await sharp(buffer)
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .webp({ quality: 80 })
    .toBuffer()
}

export default createThumbnail
