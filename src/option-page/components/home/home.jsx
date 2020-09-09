import React, { Component } from "react";
import introJs from "intro.js/intro";
import Overview from "./overview";
import MonthlyReports from "./MonthlyReports";
import Db from "../../../utils/db";
const db = new Db();

class Home extends Component {
  state = {
    isDataMounted: false,
    totalSpent: 0,
    totalAdded: 0,
    totalQRCodeScans: 0,
    frequentTransactionTo: [],
    frequentTransactionFrom: [],
    showChart: false,
    statData: null,
    userData: null,
    loaded: false,
    transactionMaxAmount: 0,
    transactionMinAmount: 0
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /** check if data was fetched previously */
    db.gets("userData", "stats", "help")
      .then(res => {
        console.log({ res });
        this.setState({
          userData: res.userData,
          totalAdded: String(res.userData.totalAdded),
          totalQRCodeScans: String(res.userData.totalQRCodeScans),
          totalSpent: String(res.userData.totalSpent),
          frequentTransactionTo: res.userData.userTxnFrequencyTo,
          frequentTransactionFrom: res.userData.userTxnFrequencyFrom,
          statData: res.stats,
          transactionMaxAmount: String(res.userData.transactionMaxAmount),
          transactionMinAmount: String(res.userData.transactionMinAmount)
        });
        if (res.help === true) {
          introJs().start();
          db.set({ help: false });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    return (
      <div>
        <Overview
          totalSpent={this.state.totalSpent}
          totalAdded={this.state.totalAdded}
          frequentTransactionTo={this.state.frequentTransactionTo}
          frequentTransactionFrom={this.state.frequentTransactionFrom}
          userData={this.state.userData}
          transactionMaxAmount={this.state.transactionMaxAmount}
          transactionMinAmount={this.state.transactionMinAmount}
          totalQRCodeScans={this.state.totalQRCodeScans}
        />
        {/*basic charts*/}
        <MonthlyReports data={this.state.statData} />
      </div>
    );
  }
}

export default Home;
