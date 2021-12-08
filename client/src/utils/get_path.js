/**
 * @param {string} imageId
 * @returns {string}
 */
function getImagePath(imageId) {
  return `/images/1000-${imageId}.jpg`;
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
 * @param {string} profileImageId
 * @returns {string}
 */
function getProfileImagePath(profileImageId) {
  return `/images/profiles/128-${profileImageId}.jpg`;
}

export { getImagePath, getMoviePath, getSoundPath, getProfileImagePath };
