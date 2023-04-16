console.log('fetch.js loaded');

export const myFetch = function (url, options = {}) {
  console.log('hello myFetch');

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(options.method || 'GET', url);
    if (options.headers) {
      Object.keys(options.headers).forEach((key) => {
        xhr.setRequestHeader(key, options.headers[key]);
      });
    }
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve({
          json: () => Promise.resolve(JSON.parse(this.response)),
          text: () => Promise.resolve(this.response),
        });
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send(options.body);
  });
};
