import fetch from "node-fetch";

function validateStatus(result) {
  const { status, message } = result;
  if (status) {
    throw new Error(message);
  }
}

function resolveResult(res, headers) {
  const result = JSON.parse(res);
  validateStatus(result);
  return {
    result,
    headers
  };
}

async function handleResponse(res) {
  const { headers } = res;
  res = await res.text();
  if (res.includes("ECONNREFUSED"))
    throw new Error("Could not connect to server");
  return resolveResult(res, headers);
}

/**
 * GET request
 *
 * @param {String} path Path to get
 */
export function get(path) {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };
  return fetch(path, request).then(async res => {
    return await handleResponse(res);
  });
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
    return await handleResponse(res);
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
