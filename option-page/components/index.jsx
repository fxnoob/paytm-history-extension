
import React, { Component } from "react";
import "tabler-react/dist/Tabler.css";
import { Card, Button, Site, Nav, Header, Page,StatsCard } from "tabler-react";
import Db  from '../../src/utils/db';
import { Api } from "../../src/utils/api";
import C3Chart from 'react-c3js';
import 'c3/c3.css';

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

      //ReactDOM.render(<C3Chart data={data} />, mountNode);

    return (
      <Site>
        <Site.Header notificationsTray href="https://www.facebook.com" imageURL="images/paytm-icon.png" alt="test">
        
        </Site.Header>
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

{/* <Nav.Link to="">
                        <Button outline color="primary">
                            Source Code
                        </Button>
                    </Nav.Link> */}

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
                <Grid.Col xl={6} lg={6}>
                    <Card title="Money Spent (By Year)">
                    {/* <div id="react-c3js">
                    
                    </div> */}
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