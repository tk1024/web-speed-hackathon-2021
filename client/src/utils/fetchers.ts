/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url: any) {
  return await (await fetch(url)).arrayBuffer()
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url: any) {
  const res = await fetch(url)
  if (res.ok) {
    return await (await fetch(url)).json()
  }
  return null
}

async function readFile(file: any) {
  return new Promise((resove) => {
    const reader = new FileReader();
    reader.onload = function(evt) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      resove(evt.target.result.split(",")[1]);
    };
    reader.readAsDataURL(file)
  })
}


/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url: any, file: any) {
  const res = await readFile(file)

  console.log(43, res)

  return await (await fetch(url, {
    method: 'POST',
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'BodyInit... Remove this comment to see the full error message
    body: res,
  })).json()
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url: any, data: any) {
  return await (await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })).json()
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
