export class Schema {
  constructor () {
    this.data = {
      /** 0: if not logged in. 1 if logged in */
      dataMounted: false ,
      /** last time when apis was hit successfully */
      lastChecked: null ,
      /** user data fetched from apis */
      userData: {
        /**username not mandatory*/
        userName: null ,
        /** total spent money by user based on history calculations */
        totalSpent: 0 ,
        /** extra user details */
        extDetails: null ,
        /** Api's original response*/
        apiOriginalResponse: null
      }
    };
  }
}
export default class Db {
  constructor () {}
  /*
   * set values in db
   * input - {key: value}
   * */
  set (params) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.set(params, () => {
          resolve(params)
        })
      } catch (e) {
        reject(e)
      }
    })
  }
  /*
    * get values from db
    * input - [key1,key2]
    * */
  get (params) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(params, (items) => {
          if (items === undefined) { reject('Error') } else { resolve(items) }
        })
      } catch (e) {
        reject(e)
      }
    })
  }
  /*
    * delete key from db
    * input - [key1,key2] or string
    * */
  remove (key_str) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.remove(key_str, (res) => {
          resolve(key_str)
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}
