import iconv from 'iconv-lite';
import jschardet from 'jschardet';
import * as MusicMetadata from 'music-metadata';
import * as Util from 'music-metadata/lib/common/Util';

/**
 * @param {Buffer} buffer
 * @returns {string}
 */
// @ts-expect-error ts-migrate(2540) FIXME: Cannot assign to 'decodeString' because it is a re... Remove this comment to see the full error message
// eslint-disable-next-line no-import-assign
Util.decodeString = function decodeString(buffer: any) {
  const detected = jschardet.detect(buffer);
  const encoding = detected.encoding || 'windows-1252';

  if (!iconv.encodingExists(encoding)) {
    throw new Error('Cannot detect charset.');
  }

  const decoded = iconv.decode(buffer, encoding);
  return decoded;
};

/**
 *
 * @typedef {object} SoundMetadata
 * @property {string} [artist]
 * @property {string} [title]
 */

/**
 * @param {Buffer} data
 * @returns {Promise<SoundMetadata>}
 */
async function extractMetadataFromSound(data: any) {
  try {
    const metadata = await MusicMetadata.parseBuffer(data);
    return {
      artist: metadata.common.artist,
      title: metadata.common.title,
    };
  } catch (_err) {
    return {
      artist: undefined,
      title: undefined,
    };
  }
}

export { extractMetadataFromSound };
