import React from "react";
import MUIDataTable from "mui-datatables";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {
  XYPlot,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  ChartLabel
} from "react-vis";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Modal from "../../../src/utils/modal";

const modal = new Modal();
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  title: {
    opacity: 0,
    marginLeft: theme.spacing.unit * 2
  },
  content: {
    marginRight: theme.spacing.unit
  },
  paper: {
    cursor: "hand",
    padding: theme.spacing.unit * 1,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "140px"
  }
});
const columns = [
  "Amount",
  "Transaction from",
  "Transaction to",
  "Description",
  "Mode",
  "Closing balance",
  "Transaction date"
];

const options = {
  filterType: "checkbox"
};

class Overview extends React.Component {
  state = {
    totalSpent: 0,
    totalAdded: 0,
    frequentTransactionTo: 0,
    frequentTransactionFrom: 0,
    open: false,
    scroll: "paper",
    title: "",
    frequentTransactiotoData: [],
    frequentTransactiofromData: [],
    frequentTransactiotoDataPlot: [],
    frequentTransactiofromDataPlot: [],
    dataTablePanelOpen: false,
    spentMoneyDataTable: [],
    addedMoneyDataTable: [],
    userData: null,
    datatableDataToShow: [["", "", "", "", "", "", ""]],
    transactionMaxAmount: 0,
    transactionMinAmount: 0
  };
  constructor(props) {
    super(props);
    this.handledataTableClose = this.handledataTableClose.bind(this);
  }
  componentDidMount() {
    const {
      totalSpent,
      totalAdded,
      frequentTransactionTo,
      frequentTransactionFrom,
      transactionMinAmount,
      transactionMaxAmount
    } = this.props;
    console.log(frequentTransactionTo);
    this.setState({
      totalSpent: totalSpent,
      totalAdded: totalAdded,
      frequentTransactionTo: modal.getMax(frequentTransactionTo),
      frequentTransactionFrom: modal.getMax(frequentTransactionFrom),
      transactionMaxAmount: frequentTransactionFrom,
      transactionMinAmount: transactionMinAmount
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
    if (this.props !== nextProps) {
      const {
        totalSpent,
        totalAdded,
        frequentTransactionTo,
        frequentTransactionFrom,
        userData
      } = nextProps;
      this.setState({
        totalSpent: totalSpent,
        totalAdded: totalAdded,
        frequentTransactionTo: modal.getMax(frequentTransactionTo),
        frequentTransactionFrom: modal.getMax(frequentTransactionFrom),
        frequentTransactiotoData: frequentTransactionTo,
        frequentTransactiofromData: frequentTransactionFrom,
        userData: userData
      });
    }
  }
  handleClickOpen = scroll => overViewFor => {
    let title = "",
      plotData = [];
    if (overViewFor === "frequentTransactionTo") {
      title = "Transactions frequencies(to)";
      let i = 0;
      plotData = Object.entries(this.state.frequentTransactiotoData).map(
        point => {
          return {
            x: i++,
            y: Number(point[1]),
            label: String(Math.round(point[1])) + " times",
            rotation: 270
          };
        }
      );
      this.setState({
        open: true,
        scroll,
        title: title,
        frequentTransactiotoDataPlot: plotData
      });
    } else if (overViewFor === "frequentTransactionFrom") {
      title = "Transactions frequencies(from)";
      let i = 0;
      plotData = Object.entries(this.state.frequentTransactiofromData).map(
        point => {
          if (point[0] === "You") point[1] = 0;
          return {
            x: i++,
            y: Number(point[1]),
            label: String(Math.round(point[1])) + " times",
            rotation: 270
          };
        }
      );
      this.setState({
        open: true,
        scroll,
        title: title,
        frequentTransactiotoDataPlot: plotData
      });
    } else if (overViewFor === "totalSpentDatatable") {
      title = "Total spent datatable";
      this.setState({
        dataTablePanelOpen: true,
        scroll,
        dataTableTitle: title,
        datatableDataToShow: this.state.userData.spentMoneyDataTable
      });
    } else if (overViewFor === "totalAddedDatatable") {
      title = "Total added datatable";
      this.setState({
        dataTablePanelOpen: true,
        scroll,
        dataTableTitle: title,
        datatableDataToShow: this.state.userData.spentMoneyDataTable
      });
    }
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleClickOnOverview(str) {
    this.handleClickOpen("paper")(str);
  }
  handledataTableClose() {
    this.setState({ dataTablePanelOpen: false });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Dialog
          maxWidth="xl"
          open={this.state.dataTablePanelOpen}
          onClose={this.handledataTableClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogContent>
            <MUIDataTable
              title={this.state.dataTableTitle}
              data={this.state.datatableDataToShow}
              columns={columns}
              options={options}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handledataTableClose} color="primary">
              close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          maxWidth="lg"
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">{this.state.title}</DialogTitle>
          <DialogContent>
            <XYPlot width={600} height={300}>
              <HorizontalGridLines />
              <LineSeries data={this.state.frequentTransactiotoDataPlot} />
              <YAxis />
              <ChartLabel
                text="time"
                className="alt-x-label"
                includeMargin={false}
                xPercent={0.025}
                yPercent={1.01}
              />
              <ChartLabel
                text="transaction frequency"
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              close
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container spacing={24} className={classes.title}>
          <Typography component="h2" variant="display1" gutterBottom>
            Overview
          </Typography>
        </Grid>
        <Divider />
        <Grid container spacing={24} className={classes.content}>
          <Grid item xs={2}>
            <Paper
              className={classes.paper}
              onClick={() => {
                this.handleClickOnOverview("totalSpentDatatable");
              }}
              data-intro="Total spent money! Click on the tab and get full details about transactions and download them with .xls,.csv format"
            >
              <Typography component="h2" variant="display1" gutterBottom>
                {Math.round(this.state.totalSpent)} ₹
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                Total spent (click to see more)
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper
              className={classes.paper}
              onClick={() => {
                this.handleClickOnOverview("totalAddedDatatable");
              }}
              data-intro="Total added money! Click on the tab and get full details about transactions and download them with xls,csv format"
            >
              <Typography component="h2" variant="display1" gutterBottom>
                {Math.round(this.state.totalAdded)} ₹
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                Total added(click to see more)
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper
              className={classes.paper}
              onClick={() => {
                this.handleClickOnOverview("frequentTransactionFrom");
              }}
              data-intro="Most Frequent transaction from.Click on the box to see overall frequencies."
            >
              <Typography component="h2" variant="display1" gutterBottom>
                {this.state.frequentTransactionFrom
                  ? this.state.frequentTransactionFrom
                  : "∞"}
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                Frequent transaction from(click to see more)
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper
              className={classes.paper}
              onClick={() => {
                this.handleClickOnOverview("frequentTransactionTo");
              }}
              data-intro="Most Frequent contact you have transferred money to.Click on the box to see overall frequencies."
            >
              <Typography component="h2" variant="display1" gutterBottom>
                {this.state.frequentTransactionTo
                  ? this.state.frequentTransactionTo
                  : "∞"}
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                Frequent transaction to(click to see more)
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="display1" gutterBottom>
                {Math.round(this.props.transactionMaxAmount)} ₹
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                Maximum amount transaction
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="display1" gutterBottom>
                {Math.round(this.props.transactionMinAmount)} ₹
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                Minimum amount transaction
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Overview);
