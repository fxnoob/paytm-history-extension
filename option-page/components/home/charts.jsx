import React, { Component } from "react";
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import Grid from '@material-ui/core/Grid';

import Db  from '../../../src/utils/db';
import { Api } from "../../../src/utils/api";
import Modal from "../../../src/utils/modal";

const db = new Db();
const api = new Api();
const modal = new Modal();

export default class Charts extends Component {
  state = {
    isDataMounted: false ,
    totalSpent: 0,
    totalAdded: 0,
    frequentTransactionTo: "",
    frequentTransactionFrom: ""
  };

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    /** check if data was fetched previously */
    db.get("userData")
      .then(res=>{
        this.setState({
          totalAdded: String(res.userData.totalAdded),
          totalSpent: String(res.userData.totalSpent),
          frequentTransactionTo: modal.getMax(res.userData.userTxnFrequencyTo),
          frequentTransactionFrom: modal.getMax(res.userData.userTxnFrequencyFrom)
        });
      })
      .catch(e=>{
        console.log(e);
      })
  }
  render() {
    const data = {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
      ]
    };
    const pie_chart_data = {
      columns: [
        ['data1', 30],
        ['data2', 120],
      ],
      type : 'pie',
      onclick: function (d, i) { console.log("onclick", d, i); },
      onmouseover: function (d, i) { console.log("onmouseover", d, i); },
      onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    }
    return (
      <React.Fragment>

      </React.Fragment>
    );
  }
}
