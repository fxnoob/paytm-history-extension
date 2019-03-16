import { Cookie } from "./cookie";

const cookie = new Cookie()

export class Api {
  constructor () {
    this.endPoint = "https://paytm.com";
    this.historyApiEndpoint =   "https://paytm.com/shop/orderhistory";
    this.totalApiCalls = 0;
    this.HistoryData = [];
    this.fetchHistory = this.fetchHistory.bind(this);
  }
  /**sleep in apis call request */
  sleep(paramsToreturn,miliseconds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(paramsToreturn);
      }, miliseconds);
    });
  }
  /** Fetch paytm User history Details  */
  async fetchHistory(apiEndPoint) {
    return fetch(apiEndPoint)
      .then(res=>{
        if(res.status === 200) {
          return res;
        }
        throw new Error(String(res.status));
      })
      .then(res => res.json())
      .then(res=>{
        return this.sleep(res,1000);
      })
      .then(res => {
        this.totalApiCalls++;
        this.HistoryData.push(res);
         if(res.hasOwnProperty("nextpage")) {
            this.sleep("https://paytm.com"+res.nextpage+30,2).then( (urlToCall) => {
              this.fetchHistory(urlToCall);
            });
         } else {
           return "DONE";
         }
      })
  }

  sleep(paramsToReturn , miliseconds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
      resolve(paramsToReturn);
      } , miliseconds);
    });
  }
}


