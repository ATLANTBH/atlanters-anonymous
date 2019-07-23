import fetch from "node-fetch";

/**
 * POST request.
 *
 * @param {String} path Path to post
 * @param {Object} data Data to post.
 * @param {Object} query Query params.
 */
export function post(path, data, query) {
  // TODO(kklisura): Add support for query params if needed.

  const request = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  };

  return fetch(path, request).then(res => res.json());
}
