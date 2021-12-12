import sharp from 'sharp';

/**
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.extension]
 * @param {number} [options.height]
 * @param {number} [options.width]
 * @returns {Promise<Uint8Array>}
 */
async function convertImage(buffer: any, options: any) {
  return sharp(buffer)
    .resize({
      fit: 'cover',
      height: options.height,
      width: options.width,
    })
    .resize({ width: 574 })
    .toFormat(options.extension ?? 'avif', {
      chromaSubsampling: "4:2:0",
    })
    .toBuffer();
}

export { convertImage };
