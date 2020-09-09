export class Schema {
  constructor() {
    this.data = {
      /** show help  */
      help: true,
      /** 0: if not logged in. 1 if logged in */
      dataMounted: false,
      /** last time when apis was hit successfully */
      lastChecked: null,
      /** user data fetched from apis */
      userData: {
        /** username not mandatory */
        userName: null,
        /** total spent money by user based on history calculations */
        totalSpent: 0,
        /** total money added to paytm wallet by user*/
        totalAdded: 0,
        /** total number of qr code scans for transaction*/
        totalQRCodeScans: 0,
        /** frequent transaction to  */
        frequentTransactionTo: "",
        /** frequent transaction from  */
        frequentTransactionFrom: "",
        /* transaction maximum amount*/
        transactionMaxAmount: 0,
        /* transaction minimum amount */
        transactionMinAmount: 0,
        /** users transactions with frequency to {user: frequency}*/
        userTxnFrequencyTo: null,
        /** users transactions with frequency from {user: frequency}*/
        userTxnFrequencyFrom: null,
        /** extra user details  */
        extDetails: null,
        /** Api's original response */
        apiOriginalResponse: null,
        /**structure for spent money datatable */
        spentMoneyDataTable: [["", "", "", "", "", "", ""]],
        /**structure for added money datatable */
        addedMoneyDataTable: [["", "", "", "", "", "", ""]]
      },
      /** status of  fetchTxHistory api (initiated|error|success)*/
      fetchTxHistoryStatus: null,
      /** monthly analysis calculations */
      stats: {
        monthlySpent: null,
        monthlyAdded: null,
        monthlyTransfer: null
      }
    };
  }
}
export default class Db {
  constructor() {}
  /*
   * set values in db
   * input - {key: value}
   * */
  set(params) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.set(params, () => {
          resolve(params);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  /*
   * get values from db
   * input - [key1,key2]
   * */
  get(params) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.get(params, items => {
          if (items === undefined) {
            reject("Error");
          } else {
            resolve(items);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  //get data for multiple keys
  gets(...params) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.get(params, items => {
          if (items === undefined) {
            reject("Error");
          } else {
            resolve(items);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  /*
   * delete key from db
   * input - [key1,key2] or string
   * */
  remove(key_str) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.remove(key_str, res => {
          resolve(key_str);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
