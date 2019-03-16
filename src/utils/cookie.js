export class Cookie {
  constructor () {}
  /** get all cookies domain wise */
  getAllCookiefromDomain(domain) {
    return new Promise((resolve, reject) => {
      chrome.cookies.getAll({ domain: domain } , (cookies) => {
        const data = cookies.map(cookie => {
            return cookie.name + "=" + cookie.value;
        })
        resolve(data.join(";"));
      });
    });
  }
 /**Cookie change listener for login check  */
 ListenToLoginCookie() {
   chrome.cookies.onChanged.addListener((info) => {
     if(info.cookie.name!=='_gid' && info.cookie.name!=='_ga') {
       console.log(info);
     }
   });
 }
}
