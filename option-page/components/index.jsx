
import React, { Component } from "react";
import "tabler-react/dist/Tabler.css";
import { Card, Button, Site, Nav, Header, Page,StatsCard, Grid } from "tabler-react";
import Db  from '../../src/utils/db';
import { Api } from "../../src/utils/api";

const db = new Db();
const api = new Api();

export default class MyCard extends Component {
  state = {
    isDataMounted: false ,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    /** check if data was fetched previously */
    // db.get("dataMounted")
    //   .then(res=>{
    //     console.log(res)
    //     if (res.dataMounted === true) {
    //       this.setState({isDataMounted: true});
    //     }
    //   })
    //   .catch(e=>{
    //     console.log(e);
    //   })
    api.fetchTxHistory()
      .then(res=> {
        console.log(api.TxHistoryData);
      })
      .catch(e=>{
        console.log(e);
      })

  }

  render() {
    return (
      <Site>
        <Site.Header href="https://www.facebook.com" imageURL="images/paytm-icon.png" alt="test"></Site.Header>
        <Site.Nav
            items={
                <React.Fragment>
                  <Nav.Item hasSubNav value="Page One" icon="globe">
                    <Nav.SubItem value="Sub Item 1" />
                    <Nav.SubItem>Sub Item 2</Nav.SubItem>
                    <Nav.SubItem icon="globe">Sub Item 3</Nav.SubItem>
                  </Nav.Item>
                  <Nav.Item to="http://www.example.com">Page Two</Nav.Item>
                  <Nav.Item value="Page Three" />
                  <Nav.Item active icon="user">
                    Page Four
                  </Nav.Item>
                </React.Fragment>
              }
        />
        <Page.Content>
            <Page.Header title="OverView" />
            <Grid.Row cards>
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
            </Grid.Row>
        </Page.Content>
        
      </Site>
    );
  }
}