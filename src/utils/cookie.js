export class Cookie {
  constructor() {
    this.excludeCookies = ["_gid", "_ga"];
  }
  /** get all cookies domain wise */
  getAllCookiefromDomain(domain) {
    return new Promise((resolve, reject) => {
      chrome.cookies.getAll({ domain: domain }, cookies => {
        const data = cookies.map(cookie => {
          return cookie.name + "=" + cookie.value;
        });
        resolve(data.join(";"));
      });
    });
  }
  /** Cookie change listener for login check  */
  ListenToLoginCookie() {
    chrome.cookies.onChanged.addListener(info => {
      if (!this.excludeCookies.contains(info.cookie.name)) {
        console.log(info);
      }
    });
  }
}
