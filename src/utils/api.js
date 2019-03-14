import { Cookie } from "./cookie";

const cookie = new Cookie()

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
  async checkLogin() {
    const apiEndPoint = this.endPoint + "shop/orderhistory";
    const cookies = await cookie.getAllCookiefromDomain("paytm.com");
    return fetch("https://api.github.com/users/swapnilbangare")
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

