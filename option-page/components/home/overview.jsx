import React, { Component } from "react";
import "tabler-react/dist/Tabler.css";
import { StatsCard, Grid } from "tabler-react";
import 'c3/c3.css';

export default class Overview extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { totalSpent , totalAdded, frequentTransactionTo, frequentTransactionFrom } = this.props;
    return (
      <React.Fragment>
        <Grid.Col xl={2} lg={2} md={4} sm={6} xs={12}>
          <StatsCard layout={1} movement=""  total={totalSpent} label="Total spent" />
        </Grid.Col>
        <Grid.Col xl={2} lg={2} md={4} sm={6} xs={12}>
          <StatsCard layout={1} movement=""  total={totalAdded} label="Total added" />
        </Grid.Col>
        <Grid.Col xl={2} lg={2} md={4} sm={6} xs={12}>
          <StatsCard layout={1} movement=""  total={frequentTransactionTo} label="Freq. transaction to" />
        </Grid.Col>
        <Grid.Col xl={2} lg={2} md={4} sm={6} xs={12}>
          <StatsCard layout={1} movement=""  total={frequentTransactionFrom} label="Freq. transaction fr." />
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
