
import React, { Component } from "react";
import "tabler-react/dist/Tabler.css";
import { Card, Button, Site, Nav, Header, Page,StatsCard,Grid } from "tabler-react";
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import HeaderComponent from "../header";
import Overview from "./overview";

import Db  from '../../../src/utils/db';
import { Api } from "../../../src/utils/api";

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
      <Site>
        <HeaderComponent/>
        <Page.Content>
          <Page.Header title="OverView" />
          <Grid.Row cards>
            {/*overview boxes*/}
            <Overview/>
            <Grid.Col xl={6} lg={6}>
              <Card title="Money Spent (By Year)">
                <C3Chart data={data} />
              </Card>
            </Grid.Col>
            <Grid.Col xl={6} lg={6}>
              <Grid.Row cards>
                <Grid.Col xl={6} lg={6}>
                  <Card title="Money Spent (By Year)">
                    <C3Chart data={pie_chart_data} />
                  </Card>
                </Grid.Col>
                <Grid.Col xl={6} lg={6}>
                  <Card title="Money Spent (By Year)">
                    <C3Chart data={pie_chart_data} />
                  </Card>
                </Grid.Col>
              </Grid.Row>
            </Grid.Col>
          </Grid.Row>
        </Page.Content>
      </Site>
    );
  }
}
