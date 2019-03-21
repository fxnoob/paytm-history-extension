import '@babel/polyfill'
import Db, { Schema } from './utils/db'
import { Cookie } from './utils/cookie'
import { txnParser } from './utils/responseParser'

const SchemaController = new Schema()
const db = new Db()
const cookie = new Cookie()

/** when extension is loaded first time */
db.get('isFirstTimeLoad')
  .then((res) => {
    if (res === undefined) {
      db.set(SchemaController.data)
        .then(() => {
          db.set({ 'isFirstTimeLoad': true })
        })
    }
  })
  .catch((e) => {})

/** communicate with popup page */
chrome.extension.onConnect.addListener((port) => {
  port.onMessage.addListener(async (request) => {
    if (request.action === 'fetchTxHistory') {
      await db.set({fetchTxHistoryStatus: "initiated"});
      port.postMessage({action: 'fetchTxHistory', status: 'initiated'});
      txnParser()
        .then(async res=>{
          await db.set({fetchTxHistoryStatus: "success", ...res});
          port.postMessage({action: 'fetchTxHistory', status: 'success',response: res});
        })
        .catch(e=>{
          port.postMessage({action: 'fetchTxHistory', status: 'error',response: e});
        });
    }
  });
})

/** Listen to chrome cookie changes */
cookie.ListenToLoginCookie()
