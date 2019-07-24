import fetch from "node-fetch";

function checkStatus(res) {
  const { status, statusText } = res;
  if (status === 200) return;
  const errorOutput = status + " " + statusText;
  throw new Error(errorOutput);
}

/**
 * POST request.
 *
 * @param {String} path Path to post
 * @param {Object} data Data to post.
 * @param {Object} query Query params.
 */
export function post(path, data, query = {}) {
  // TODO(kklisura): Add support for query params if needed.
  const request = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  };
  return fetch(path, request).then(res => {
    checkStatus(res);
  });
}
