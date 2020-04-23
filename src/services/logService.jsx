import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn:
      "https://c336cb6cde4c4f16abbb356bf08b519f@o381005.ingest.sentry.io/5207696",
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default { init, log };
