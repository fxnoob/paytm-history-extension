import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/es/Typography/Typography";
import MUIDataTable from "mui-datatables";
const options = {
  filterType: "checkbox",
  rowsPerPage: 12
};
const MonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const columns = ["Month", "Total Transaction"];
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
    monthlyExpensedataTableTitle: "Monthly Expenses",
    crosshairValues: [],
    selectedYear: "",
    monthlyExpenseData: []
  };

  constructor(props) {
    super(props);
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
  changeYear = year => {
    const data = this.props.data;
    console.log(data);
    const response = Object.entries(data[year]).map(point => [
      MonthNames[point[0]],
      point[1]
    ]);
    console.log({ response });
    this.setState({ monthlyExpenseData: response, selectedYear: year });
  };
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
              marginTop: "30px",
              marginLeft: "10px",
              fontSize: "20px"
            }}
          >
            Click on any year to see monthly transactions
          </Typography>
        </Grid>
        <Grid container spacing={24} className={classes.title}>
          <Grid item xs={4}>
            <MUIDataTable
              title={`${this.state.monthlyExpensedataTableTitle}(${this.state.selectedYear})`}
              data={this.state.monthlyExpenseData}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Charts);
