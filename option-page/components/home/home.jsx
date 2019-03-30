import React, { Component } from "react";
import Divider  from '@material-ui/core/Divider'
import HeaderComponent from "../header";
import Overview from "./overview";
import Charts from "./charts";

import Db  from '../../../src/utils/db';
import { Api } from "../../../src/utils/api";
import Modal from "../../../src/utils/modal";

const db = new Db();
const api = new Api();
const modal = new Modal();

export default class Home extends Component {
  state = {
    isDataMounted: false ,
    totalSpent: 0,
    totalAdded: 0,
    frequentTransactionTo: [],
    frequentTransactionFrom: [],
    showChart: false,
    statData: null
  };

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    /** check if data was fetched previously */
    db.get(["userData","stats"])
      .then(res=>{
        this.setState({
          totalAdded: String(res.userData.totalAdded),
          totalSpent: String(res.userData.totalSpent),
          frequentTransactionTo: res.userData.userTxnFrequencyTo ,
          frequentTransactionFrom: res.userData.userTxnFrequencyFrom,
          statData: res.stats
        });
      })
      .then(res=>{
        return api.sleep(null,1000);
      })
      .then(res=>{
        this.setState({showChart: true});
      })
      .catch(e=>{
        console.log(e);
      })
  }
  render() {

    return (
      <React.Fragment>
        <HeaderComponent/>
        {/*overview boxes*/}
        <Overview
          totalSpent={this.state.totalSpent}
          totalAdded={this.state.totalAdded}
          frequentTransactionTo={this.state.frequentTransactionTo}
          frequentTransactionFrom={this.state.frequentTransactionFrom}
        />
        {/*basic charts*/}
        {this.state.showChart?<Charts data={this.state.statData}/>:""}
      </React.Fragment>
    );
  }
}
