import React, { Component } from "react";
import "react-vis/dist/style";
/** https://github.com/uber/react-vis */
import {XYPlot, XAxis, YAxis, HorizontalGridLines,LabelSeries,LineSeries,VerticalBarSeries,ChartLabel} from 'react-vis';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing.unit* 2 ,
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    color: 'rgb(130, 130, 130)',
    backgroundColor: '#ffffff',
    marginBottom: theme.spacing.unit*3,
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit ,
  },
  title:{
    marginLeft: theme.spacing.unit * 2,
  },
  content:{
    marginRight: theme.spacing.unit ,
  },
  paper: {
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Charts extends Component {
  state = {
    isDataMounted: false ,
    totalSpent: 0,
    totalAdded: 0,
    frequentTransactionTo: "",
    frequentTransactionFrom: "",
    graphData1: null,
    barGraphdata1: []
  };

  constructor(props) {
    super(props);
    this.changeYear = this.changeYear.bind(this);
  }
  componentDidMount () {
    /**get stats data from props */
    const stats = this.props.data;
    this.setState({graphData1: stats})
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({graphData1: nextProps.data})
    }
  }
  changeYear(year) {
    const data = this.props.data;
    const response = Object.entries(data[year]).map(point=>{
      return {
        x: Number(point[0]),
        y: point[1],
        label: String(Math.round(point[1])) + '₹',
        rotation: 270
      }
    })
    console.log(response);
    this.setState({barGraphdata1: response})
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Divider/>
        <Grid container spacing={24}  className={classes.title} data-intro='years in which you have done transaction. Click on any year button to see total monthly expense bar graph'>
          {this.state.graphData1 && Object.keys(this.state.graphData1).map(year=>{
            return (
              <Button key={year} variant="contained" onClick={()=>{this.changeYear(year)}} className={classes.button}>
                {year}
              </Button>
            );
          })}
        </Grid>
        <Grid container spacing={24}  className={classes.title}>
          <Grid item xs={4}>
            <XYPlot
              width={400}
              height={300}>
              <HorizontalGridLines />
              <LabelSeries
                animation
                allowOffsetToBeReversed
                data={this.state.barGraphdata1} />
              <VerticalBarSeries data={this.state.barGraphdata1} />
              <LineSeries
                data={this.state.barGraphdata1}/>
              <XAxis />
              <YAxis />
              <ChartLabel
                text="months"
                className="alt-x-label"
                includeMargin={false}
                xPercent={0.025}
                yPercent={1.01}
              />
              <ChartLabel
                text="Spent money"
                className="alt-y-label"
                includeMargin={false}
                xPercent={0.06}
                yPercent={0.06}
                style={{
                  transform: 'rotate(-90)',
                  textAnchor: 'end'
                }}
              />
            </XYPlot>
          </Grid>
          <Grid item xs={4}>
            <XYPlot
              width={400}
              height={300}>
              <HorizontalGridLines />
              <LabelSeries
                animation
                allowOffsetToBeReversed
                data={this.state.barGraphdata1} />
              <VerticalBarSeries data={this.state.barGraphdata1} />
              <LineSeries
                data={this.state.barGraphdata1}/>
              <XAxis />
              <YAxis />
              <ChartLabel
                text="months"
                className="alt-x-label"
                includeMargin={false}
                xPercent={0.025}
                yPercent={1.01}
              />
              <ChartLabel
                text="Spent money"
                className="alt-y-label"
                includeMargin={false}
                xPercent={0.06}
                yPercent={0.06}
                style={{
                  transform: 'rotate(-90)',
                  textAnchor: 'end'
                }}
              />
            </XYPlot>
          </Grid>
          <Grid item xs={4}>
            <XYPlot
              width={400}
              height={300}>
              <HorizontalGridLines />
              <LabelSeries
                animation
                allowOffsetToBeReversed
                data={this.state.barGraphdata1} />
              <VerticalBarSeries data={this.state.barGraphdata1} />
              <LineSeries
                data={this.state.barGraphdata1}/>
              <XAxis />
              <YAxis />
              <ChartLabel
                text="months"
                className="alt-x-label"
                includeMargin={false}
                xPercent={0.025}
                yPercent={1.01}
              />
              <ChartLabel
                text="Spent money"
                className="alt-y-label"
                includeMargin={false}
                xPercent={0.06}
                yPercent={0.06}
                style={{
                  transform: 'rotate(-90)',
                  textAnchor: 'end'
                }}
              />
            </XYPlot>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Charts);
