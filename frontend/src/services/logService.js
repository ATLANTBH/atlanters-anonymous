import Raven from "raven-js";
function init() {
  // Raven.config("https://03511474ec8f481ea5522f6b9703959d@sentry.io/1477514", {
  //   release: "1-0-0",
  //   environment: "dev"
  // }).install();
}

function log(error) {
  console.log(error);
  //Raven.captureException(error);
}

export default {
  init,
  log
};
