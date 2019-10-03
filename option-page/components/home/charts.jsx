import React, { Component } from "react";
import "react-vis/dist/style";
/** https://github.com/uber/react-vis */
import {
  XYPlot,
  XAxis,
  YAxis,
  Crosshair,
  HorizontalGridLines,
  LabelSeries,
  LineSeries,
  VerticalBarSeries,
  ChartLabel
} from "react-vis";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/es/Typography/Typography";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  button: {
    color: "rgb(130, 130, 130)",
    backgroundColor: "#ffffff",
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  },
  title: {
    fontSize: 14
  },
  content: {
    marginRight: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit * 1,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  }
});

class Charts extends Component {
  state = {
    isDataMounted: false,
    totalSpent: 0,
    totalAdded: 0,
    frequentTransactionTo: "",
    frequentTransactionFrom: "",
    graphData1: null,
    barGraphdata1: [],
    crosshairValues: []
  };

  constructor(props) {
    super(props);
    this.changeYear = this.changeYear.bind(this);
  }
  componentDidMount() {
    /**get stats data from props */
    const stats = this.props.data;
    this.setState({ graphData1: stats });
    setTimeout(() => {
      const year = Object.keys(this.props.data)[0];
      this.changeYear(year);
    }, 300);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ graphData1: nextProps.data });
      console.log("nextProps", nextProps.data);
    }
  }
  changeYear(year) {
    const data = this.props.data;
    console.log(data);
    const response = Object.entries(data[year]).map(point => {
      return {
        x: Number(point[0]),
        y: point[1],
        label: String(Math.round(point[1])) + "₹",
        rotation: 270
      };
    });
    console.log(response);
    this.setState({ barGraphdata1: response });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Divider />
        <Grid
          container
          spacing={24}
          style={{ marginLeft: "10px" }}
          className={classes.title}
          data-intro="years in which you have done transaction. Click on any year button to see total monthly expense bar graph"
        >
          {this.state.graphData1 &&
            Object.keys(this.state.graphData1).map(year => {
              return (
                <Button
                  key={year}
                  variant="contained"
                  onClick={() => {
                    this.changeYear(year);
                  }}
                  className={classes.button}
                >
                  {year}
                </Button>
              );
            })}
          <Typography
            component="p"
            variant="display1"
            gutterBottom
            style={{
              marginTop: "20px",
              marginLeft: "10px"
            }}
          >
            Click on any year to see expenditure Graph year wise
          </Typography>
        </Grid>
        <Grid container spacing={24} className={classes.title}>
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardContent>
                <XYPlot width={385} height={300}>
                  <HorizontalGridLines />
                  <LabelSeries
                    animation
                    allowOffsetToBeReversed
                    data={this.state.barGraphdata1}
                  />
                  <LineSeries data={this.state.barGraphdata1} />
                  <Crosshair values={this.state.crosshairValues} />
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
                      transform: "rotate(-90)",
                      textAnchor: "end"
                    }}
                  />
                </XYPlot>
              </CardContent>
              <CardActions>
                <p>Graph of total transacted money per month</p>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardContent>
                <XYPlot width={385} height={300}>
                  <HorizontalGridLines />
                  <LabelSeries
                    animation
                    allowOffsetToBeReversed
                    data={this.state.barGraphdata1}
                  />
                  <LineSeries data={this.state.barGraphdata1} />
                  <Crosshair values={this.state.crosshairValues} />
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
                      transform: "rotate(-90)",
                      textAnchor: "end"
                    }}
                  />
                </XYPlot>
              </CardContent>
              <CardActions>
                <p>Graph of total transacted money per month</p>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardContent>
                <XYPlot width={385} height={300}>
                  <HorizontalGridLines />
                  <LabelSeries
                    animation
                    allowOffsetToBeReversed
                    data={this.state.barGraphdata1}
                  />
                  <LineSeries data={this.state.barGraphdata1} />
                  <Crosshair values={this.state.crosshairValues} />
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
                      transform: "rotate(-90)",
                      textAnchor: "end"
                    }}
                  />
                </XYPlot>
              </CardContent>
              <CardActions>
                <p>Graph of total transacted money per month</p>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Charts);
