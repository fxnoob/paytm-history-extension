
import React, { Component } from "react";
import "tabler-react/dist/Tabler.css";
import { StatsCard, Grid } from "tabler-react";
import 'c3/c3.css';

import Db  from '../../../src/utils/db';
import { Api } from "../../../src/utils/api";

const db = new Db();
const api = new Api();

export default class MyCard extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    /** check if data was fetched previously */
    db.get("dataMounted")
      .then(res=>{
        console.log(res)
        if (res.dataMounted === true) {
          this.setState({isDataMounted: true});
        }
      })
      .catch(e=>{
        console.log(e);
      })
  }

  render() {
    return (
      <React.Fragment>
        <Grid.Col xl={2} lg={2} md={4} sm={6} xs={12}>
          <StatsCard layout={1} movement={-3}  total="17" label="Phone Recharge" />
        </Grid.Col>
        <Grid.Col xl={2} lg={2} md={4} sm={6} xs={12}>
          <StatsCard layout={1} movement={-3}  total="17" label="Phone Recharge" />
        </Grid.Col>
        <Grid.Col xl={2} lg={2} md={4} sm={6} xs={12}>
          <StatsCard layout={1} movement={-3}  total="17" label="Phone Recharge" />
        </Grid.Col>
        <Grid.Col xl={2} lg={2} md={4} sm={6} xs={12}>
          <StatsCard layout={1} movement={-3}  total="17" label="Phone Recharge" />
        </Grid.Col>
        <Grid.Col xl={2} lg={2} md={4} sm={6} xs={12}>
          <StatsCard layout={1} movement={-3}  total="17" label="Phone Recharge" />
        </Grid.Col>
        <Grid.Col xl={2} lg={2} md={4} sm={6} xs={12}>
          <StatsCard layout={1} movement={-3}  total="17" label="Phone Recharge" />
        </Grid.Col>
      </React.Fragment>
    );
  }
}
