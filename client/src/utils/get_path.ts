/**
 * @param {string} imageId
 * @returns {string}
 */
function getImagePath(imageId: any) {
  return `/images/${imageId}.avif`;
}

/**
 * @param {string} movieId
 * @returns {string}
 */
function getMoviePath(movieId: any) {
  return `/movies/${movieId}.mp4`;
}

/**
 * @param {string} soundId
 * @returns {string}
 */
function getSoundPath(soundId: any) {
  return `/sounds/${soundId}.mp3`;
}

/**
 * @param {string} soundId
 * @returns {string}
 */
 function getSoundSvgPath(soundId: any) {
  return `/sound-svgs/${soundId}.svg`;
}

/**
 * @param {string} profileImageId
 * @returns {string}
 */
function getProfileImagePath(profileImageId: any) {
  return `/images/profiles/${profileImageId}.avif`;
}

export { getImagePath, getMoviePath, getSoundPath, getSoundSvgPath, getProfileImagePath };
