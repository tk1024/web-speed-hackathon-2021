/**
 * @param {string} imageId
 * @returns {string}
 */
function getImagePath(imageId) {
  return `/images/${imageId}.avif`;
}

/**
 * @param {string} movieId
 * @returns {string}
 */
function getMoviePath(movieId) {
  return `/movies/${movieId}.gif`;
}

/**
 * @param {string} soundId
 * @returns {string}
 */
function getSoundPath(soundId) {
  return `/sounds/${soundId}.mp3`;
}

/**
 * @param {string} soundId
 * @returns {string}
 */
 function getSoundSvgPath(soundId) {
  return `/sound-svgs/${soundId}.svg`;
}

/**
 * @param {string} profileImageId
 * @returns {string}
 */
function getProfileImagePath(profileImageId) {
  return `/images/profiles/${profileImageId}.avif`;
}

export { getImagePath, getMoviePath, getSoundPath, getSoundSvgPath, getProfileImagePath };
