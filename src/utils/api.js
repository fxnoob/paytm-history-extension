export class Api {
  constructor () {
    this.endPoint = "https://paytm.com/";
  }
  /** check if user is logged into the  site  */
  checkLog() {
    const apiEndPoint = this.endPoint + "shop/orderhistory";
    return new Promise( (resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.onload =  () => {
        var redirectsTo;
        if (xhr.status < 400 && xhr.status >= 300) {
          redirectsTo = xhr.getResponseHeader("Location");
        } else if (xhr.responseURL && xhr.responseURL != url) {
          redirectsTo = xhr.responseURL;
        }
        resolve(redirectsTo);
      };
      xhr.open('HEAD', apiEndPoint, true);
      xhr.send();
    })
  }
  checkLogin() {
    return fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        cookie: JSON.stringify({}),
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
  }
  fetchHistory() {

  }
  getRedirectUrl(url, redirectCount) {
    redirectCount = redirectCount || 0;
    if (redirectCount > 10) {
      throw new Error("Redirected too many times.");
    }

    return new Promise(function (resolve) {
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        var redirectsTo;

        if (xhr.status < 400 && xhr.status >= 300) {
          redirectsTo = xhr.getResponseHeader("Location");
        } else if (xhr.responseURL && xhr.responseURL != url) {
          redirectsTo = xhr.responseURL;
        }

        resolve(redirectsTo);
      };

      xhr.open('HEAD', url, true);
      xhr.send();
    })
      .then(function (redirectsTo) {
        return redirectsTo
          ? getRedirectUrl(redirectsTo, redirectCount+ 1)
          : url;
      });
  }
}

