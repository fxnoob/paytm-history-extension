export class Cookie {
  constructor () {}
  /** get all cookies domain wise */
  getAllCookiefromDomain(domain) {
    return new Promise((resolve, reject) => {
      chrome.cookies.getAll({ domain: domain } , (cookies) => {
        resolve(cookies);
      });
    });
  }

}
