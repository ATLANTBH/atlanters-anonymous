import fetch from "node-fetch";

function checkStatus(res) {
  const { status, statusText } = res;
  if (status === 200) return;
  const errorOutput = status + " " + statusText;
  throw new Error(errorOutput);
}

function post(url, body) {
  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
  return new Promise((resolve, reject) => {
    fetch(url, init)
      .then(res => {
        checkStatus(res);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default {
  post
};
