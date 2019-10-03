export class Api {
  constructor() {
    this.endPoint = "https://paytm.com";
    this.historyApiEndpoint = "https://paytm.com/shop/orderhistory";
    this.totalTxHistoryApiCalls = 0;
    this.totalApiCalls = 0;
    this.HistoryData = [];
    this.TxHistoryData = [];
    this.fetchHistory = this.fetchHistory.bind(this);
    this.fetchTxHistory = this.fetchTxHistory.bind(this);
  }
  /** sleep in apis call request */
  sleep(paramsToreturn, miliseconds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(paramsToreturn);
      }, miliseconds);
    });
  }
  /** Fetch paytm User history Details  */
  async fetchHistory(apiEndPoint) {
    return fetch(apiEndPoint)
      .then(res => {
        if (res.status === 200) {
          return res;
        }
        throw new Error(String(res.status));
      })
      .then(res => res.json())
      .then(res => {
        return this.sleep(res, 1000);
      })
      .then(res => {
        this.totalApiCalls++;
        this.HistoryData.push(res);
        if (res.hasOwnProperty("nextpage")) {
          return this.fetchHistory("https://paytm.com" + res.nextpage + 30);
        } else {
          return "DONE";
        }
      });
  }
  /**  transaction history endpoint url helper */
  getTxHistoryEndPoint(pageSize, pageNumber) {
    return `https://paytm.com/v1/api/wallet/txnhistory?page_size=${pageSize}&page_number=${pageNumber}&channel=web&child_site_id=1&site_id=1&version=2`;
  }
  /** fetch user wallet transaction details */
  async fetchTxHistory() {
    let apiEndPoint = this.getTxHistoryEndPoint(
      10,
      this.totalTxHistoryApiCalls
    );
    return fetch(apiEndPoint)
      .then(res => {
        if (res.status === 200) {
          return res;
        }
        throw new Error(String(res.status));
      })
      .then(res => res.json())
      .then(res => {
        return this.sleep(res, 1000);
      })
      .then(res => {
        this.totalTxHistoryApiCalls++;
        this.TxHistoryData.push(res);
        if (res.response.length !== 0) {
          return this.fetchTxHistory(
            this.getTxHistoryEndPoint(10, this.totalTxHistoryApiCalls)
          );
        } else {
          return "DONE";
        }
      });
  }
}
