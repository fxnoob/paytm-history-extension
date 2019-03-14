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
  /** Fetch paytm User history Details  */
  async fetchHistory(apiEndPoint) {
    return fetch(apiEndPoint)
      .then(res => res.json())
      .then(res => {
        this.totalApiCalls++;
        this.HistoryData.push(res);
         if(res.hasOwnProperty("nextpage")) {
           return this.fetchHistory("https://paytm.com"+res.nextpage+30);
         } else {
           return "DONE";
         }
      })
  }
}


