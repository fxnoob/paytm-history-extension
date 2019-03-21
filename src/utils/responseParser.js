import { Api } from './api';
import Modal from "./modal";

const api = new Api()
const modal = new Modal()

export const txnParser = async () => {
  return api.fetchTxHistory()
    .then(res=> {
      let totalSpent = 0 , totalAdded = 0;
      console.log(api.TxHistoryData);
      const transactionWithFreqTo = modal.proxy();
      const userTxnFrequencyFrom = modal.proxy();
      const result = api.TxHistoryData.map(thd=> {
        if (thd.statusCode === "SUCCESS") {
          thd.response.map(order=> {
            if (order.txnStatus === "SUCCESS") {
              if (order.txntype === "DR") {
                transactionWithFreqTo[order.txnTo]++;
                totalSpent+= order.extendedTxnInfo[0].amount;
              }
              else if (order.txntype === "CR") {
                userTxnFrequencyFrom[order.txnFrom]++
                totalAdded+= order.extendedTxnInfo[0].amount;
              }
            }
          });
        }
      });
      return {
        /** 0: if not logged in. 1 if logged in */
        dataMounted: true,
        /** last time when apis was hit successfully */
        lastChecked: +new Date,
        /** user data fetched from apis */
        userData: {
          /**username not mandatory*/
          userName: null,
          /** total spent money by user based on history calculations */
          totalSpent: totalSpent,
          /** total money added to paytm wallet by user*/
          totalAdded: totalAdded ,
          /** users transactions with frequency to {user: frequency}*/
          userTxnFrequencyTo: transactionWithFreqTo ,
          /** users transactions with frequency from {user: frequency}*/
          userTxnFrequencyFrom: userTxnFrequencyFrom ,
          /** extra user details */
          extDetails: null,
          /** Api's original response*/
          apiOriginalResponse: api.TxHistoryData
        }
      };
    });
}
