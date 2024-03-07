/**
 * Sets up event listeners on the Browser.Page instance to maintain a set
 * of URLs that have started but never finished or failed.
 *
 * @param {Object} page
 * @return Object
 */

const createTracker = (page) => {
  const requests = new Set();
  const onStarted = (request) => requests.add(request);
  const onFinished = (request) => requests.delete(request);
  page.on('request', onStarted);
  page.on('requestfinished', onFinished);
  page.on('requestfailed', onFinished);
  return {
    urls: () => Array.from(requests).map((r) => r.url()),
    dispose: () => {
      page.removeAllListeners('request', onStarted);
      page.removeAllListeners('requestfinished', onFinished);
      page.removeAllListeners('requestfailed', onFinished);
    },
  };
};

module.exports = { createTracker };
