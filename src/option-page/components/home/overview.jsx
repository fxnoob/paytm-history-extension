import React from "react";
import MUIDataTable from "mui-datatables";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Modal from "../../../utils/modal";
import MiniCard from "./MiniCard";
import SpentMoneyIcon from "@material-ui/icons/Publish";
import AddedMoneyIcon from "@material-ui/icons/GetApp";
import MaxiMinIcon from "@material-ui/icons/MaximizeRounded";
import FrequentTransactionIcon from "@material-ui/icons/SettingsInputComponent";

const modal = new Modal();
const styles = theme => ({
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
    userData: false,
    datatableDataToShow: [["", "", "", "", "", "", ""]],
    transactionMaxAmount: 0,
    transactionMinAmount: 0,
    frequentTransactiotoFromData: []
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {
      totalSpent,
      totalAdded,
      frequentTransactionTo,
      frequentTransactionFrom,
      transactionMinAmount,
      transactionMaxAmount,
      userData
    } = this.props;
    console.log({ transactionMaxAmount, transactionMinAmount });
    this.setState({
      userData: userData,
      totalSpent: totalSpent,
      totalAdded: totalAdded,
      frequentTransactionTo: modal.getMax(frequentTransactionTo),
      frequentTransactiotoData: frequentTransactionTo,
      frequentTransactionFrom: modal.getMax(frequentTransactionFrom),
      frequentTransactiofromData: frequentTransactionFrom,
      transactionMaxAmount: frequentTransactionFrom,
      transactionMinAmount: transactionMinAmount
    });
  }
  handleClickOpen = scroll => overViewFor => {
    let title = "",
      plotData = [];
    if (overViewFor === "frequentTransactionTo") {
      title = "Transactions frequencies(to)";
      let i = 0;
      plotData = Object.entries(this.state.frequentTransactiotoData).map(
        point => {
          console.log({ point });
          return {
            x: i++,
            y: Number(point[1]),
            contact: point[0],
            label: String(Math.round(point[1])) + " times",
            rotation: 270
          };
        }
      );
      const frequentTransactiotoFromData = plotData.map(data => {
        return [data.contact, data.y];
      });
      this.setState({
        open: true,
        scroll,
        title: title,
        frequentTransactiotoDataPlot: plotData,
        frequentTransactiotoFromData: frequentTransactiotoFromData
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
            contact: point[0],
            label: String(Math.round(point[1])) + " times",
            rotation: 270
          };
        }
      );
      const frequentTransactiotoFromData = plotData.map(data => {
        return [data.contact, data.y];
      });
      this.setState({
        open: true,
        scroll,
        title: title,
        frequentTransactiotoDataPlot: plotData,
        frequentTransactiotoFromData: frequentTransactiotoFromData
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
  handledataTableClose = () => {
    this.setState({ dataTablePanelOpen: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
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
            <MUIDataTable
              columns={["Contact", "Frequency"]}
              data={this.state.frequentTransactiotoFromData}
              options={options}
            />
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
        <Grid container spacing={24} className={classes.content}>
          <Grid item xs={2}>
            <MiniCard
              Icon={SpentMoneyIcon}
              title="Total Spent (₹)"
              stat={Math.round(this.state.totalSpent)}
              seeMoreCallback={() => {
                this.handleClickOnOverview("totalSpentDatatable");
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <MiniCard
              Icon={AddedMoneyIcon}
              title="Total Added (₹)"
              stat={Math.round(this.state.totalAdded)}
              seeMoreCallback={() => {
                this.handleClickOnOverview("totalAddedDatatable");
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <MiniCard
              Icon={FrequentTransactionIcon}
              title="Frequent transaction with(from)"
              stat={this.state.frequentTransactionFrom}
              seeMoreCallback={() => {
                this.handleClickOnOverview("frequentTransactionFrom");
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <MiniCard
              Icon={FrequentTransactionIcon}
              title="Frequent trans. with(to)"
              stat={this.state.frequentTransactionTo}
              seeMoreCallback={() => {
                this.handleClickOnOverview("frequentTransactionTo");
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={24} className={classes.content}>
          <Grid item xs={2}>
            <MiniCard
              isLink={false}
              Icon={MaxiMinIcon}
              title="Max money transaction (₹)"
              stat={this.props.transactionMaxAmount}
            />
          </Grid>
          <Grid item xs={2}>
            <MiniCard
              isLink={false}
              Icon={MaxiMinIcon}
              title="Min money transaction (₹)"
              stat="0"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Overview);
