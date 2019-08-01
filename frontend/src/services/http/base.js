import fetch from "node-fetch";

function checkStatus(result) {
  const { status, message } = result;
  if (status) {
    throw new Error(message);
  }
}

async function resolveResult(res) {
  const { headers } = res;
  const result = await res.json();
  checkStatus(result);
  return {
    result,
    headers
  };
}

/**
 * POST request
 *
 * @param {String} path Path to post
 * @param {Object} data Data to post
 * @param {Object} query Query params
 */
export function post(path, data, query = {}) {
  const request = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  };
  return fetch(path, request).then(async res => {
    return await resolveResult(res);
  });
}

/**
 * DELETE request
 *
 * @param {String} path Path to delete
 * @param {Object} data Data containing headers
 * @param {Object} query Query params
 */

export function deleteCall(path, data, query = {}) {
  const request = {
    method: "DELETE",
    headers: data.headers
  };
  return fetch(path, request).then(async res => {
    if (res.status !== 200) {
      return await resolveResult(res);
    }
    return res;
  });
}
