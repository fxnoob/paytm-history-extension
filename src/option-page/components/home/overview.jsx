import React from "react";
import MUIDataTable from "mui-datatables";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Modal from "../../../utils/modal";
import QRICon from "./qr_icon.png";

const modal = new Modal();
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
  constructor(props) {
    super(props);
    this.state = {
      totalSpent: props.totalSpent,
      totalAdded: props.totalAdded,
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
      plotData = Object.entries(this.props.frequentTransactionTo).map(point => {
        console.log({ point });
        return {
          x: i++,
          y: Number(point[1]),
          contact: point[0],
          label: String(Math.round(point[1])) + " times",
          rotation: 270
        };
      });
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
      plotData = Object.entries(this.props.frequentTransactionFrom).map(
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
        datatableDataToShow: this.props.userData.spentMoneyDataTable
      });
    } else if (overViewFor === "totalAddedDatatable") {
      title = "Total added datatable";
      this.setState({
        dataTablePanelOpen: true,
        scroll,
        dataTableTitle: title,
        datatableDataToShow: this.props.userData.spentMoneyDataTable
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
        <div
          className="bg-white"
          style={{ marginTop: "4rem", background: "aliceblue" }}
        >
          <div className="max-w-7xl mx-auto grid row-gap-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
            <a
              href="#"
              className="-m-3 p-3 flex flex-col justify-between space-y-6 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
            >
              <div className="space-x-4 flex md:h-full lg:flex-col lg:space-x-0 lg:space-y-4">
                <div className="flex-shrink-0 flex items-center">
                  <span
                    style={{ background: "var(--main-color)" }}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      ></path>
                    </svg>
                  </span>
                  <span className="hidden lg:block text-sm leading-5 text-gray-500 pl-2">
                    Total spent
                  </span>
                </div>
                <div className="space-y-2 md:flex-1 md:flex md:flex-col md:justify-between lg:space-y-4">
                  <div className="space-y-1">
                    <p className="text-base leading-6 font-medium text-gray-900">
                      {this.props.totalSpent} rupees
                    </p>
                    <p className="text-sm leading-5 text-gray-500">
                      total money you have spent from your paytm wallet
                    </p>
                  </div>
                  <p
                    onClick={() => {
                      this.handleClickOnOverview("totalSpentDatatable");
                    }}
                    style={{ color: "var(--main-color)" }}
                    className="text-sm leading-5 font-medium text-indigo-600"
                  >
                    View more →
                  </p>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="-m-3 p-3 flex flex-col justify-between space-y-6 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
            >
              <div className="space-x-4 flex md:h-full lg:flex-col lg:space-x-0 lg:space-y-4">
                <div className="flex-shrink-0 flex items-center">
                  <span
                    style={{ background: "var(--main-color)" }}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                      ></path>
                    </svg>
                  </span>
                  <span className="hidden lg:block text-sm leading-5 text-gray-500 pl-2">
                    Total added
                  </span>
                </div>
                <div className="space-y-2 md:flex-1 md:flex md:flex-col md:justify-between lg:space-y-4">
                  <div className="space-y-1">
                    <p className="text-base leading-6 font-medium text-gray-900">
                      {this.props.totalAdded} rupees
                    </p>
                    <p className="text-sm leading-5 text-gray-500">
                      total money you have added to your paytm wallet
                    </p>
                  </div>
                  <p
                    onClick={() => {
                      this.handleClickOnOverview("totalAddedDatatable");
                    }}
                    style={{ color: "var(--main-color)" }}
                    className="text-sm leading-5 font-medium text-indigo-600"
                  >
                    View more →
                  </p>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="-m-3 p-3 flex flex-col justify-between space-y-6 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
            >
              <div className="space-x-4 flex md:h-full lg:flex-col lg:space-x-0 lg:space-y-4">
                <div className="flex-shrink-0 flex items-center">
                  <span
                    style={{ background: "var(--main-color)" }}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                  </span>
                  <span className="hidden lg:block text-sm leading-5 text-gray-500 pl-2">
                    Frequent transaction (with)
                  </span>
                </div>
                <div className="space-y-2 md:flex-1 md:flex md:flex-col md:justify-between lg:space-y-4">
                  <div className="space-y-1">
                    <p className="text-base leading-6 font-medium text-gray-900">
                      {modal.getMax(this.props.frequentTransactionTo)}
                    </p>
                    <p className="text-sm leading-5 text-gray-500">
                      you have transacted to this contact max times
                    </p>
                  </div>
                  <p
                    onClick={() => {
                      this.handleClickOnOverview("frequentTransactionTo");
                    }}
                    style={{ color: "var(--main-color)" }}
                    className="text-sm leading-5 font-medium text-indigo-600"
                  >
                    View more →
                  </p>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="-m-3 p-3 flex flex-col justify-between space-y-6 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
            >
              <div className="space-x-4 flex md:h-full lg:flex-col lg:space-x-0 lg:space-y-4">
                <div className="flex-shrink-0 flex items-center">
                  <span
                    style={{ background: "var(--main-color)" }}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      ></path>
                    </svg>
                  </span>
                  <span className="hidden lg:block text-sm leading-5 text-gray-500 pl-2">
                    Frequent transaction (From)
                  </span>
                </div>
                <div className="space-y-2 md:flex-1 md:flex md:flex-col md:justify-between lg:space-y-4">
                  <div className="space-y-1">
                    <p className="text-base leading-6 font-medium text-gray-900">
                      {modal.getMax(this.props.frequentTransactionFrom)}
                    </p>
                    <p className="text-sm leading-5 text-gray-500">
                      you got transaction from this contact max times
                    </p>
                  </div>
                  <p
                    onClick={() => {
                      this.handleClickOnOverview("frequentTransactionFrom");
                    }}
                    style={{ color: "var(--main-color)" }}
                    className="text-sm leading-5 font-medium text-indigo-600"
                  >
                    View more →
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="bg-white" style={{ background: "aliceblue" }}>
          <div className="max-w-7xl mx-auto grid row-gap-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
            <a
              href="#"
              className="-m-3 p-3 flex flex-col justify-between space-y-6 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
            >
              <div className="space-x-4 flex md:h-full lg:flex-col lg:space-x-0 lg:space-y-4">
                <div className="flex-shrink-0 flex items-center">
                  <span
                    style={{ background: "var(--main-color)" }}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12"
                  >
                    <img src={QRICon} className="h-6 w-6" />
                  </span>
                  <span className="hidden lg:block text-sm leading-5 text-gray-500 pl-2">
                    Total QR scans
                  </span>
                </div>
                <div className="space-y-2 md:flex-1 md:flex md:flex-col md:justify-between lg:space-y-4">
                  <div className="space-y-1">
                    <p className="text-base leading-6 font-medium text-gray-900">
                      {this.props.totalQRCodeScans} times
                    </p>
                    <p className="text-sm leading-5 text-gray-500">
                      you have scanned qr code for transaction from wallet
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="-m-3 p-3 flex flex-col justify-between space-y-6 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
            >
              <div className="space-x-4 flex md:h-full lg:flex-col lg:space-x-0 lg:space-y-4">
                <div className="flex-shrink-0 flex items-center">
                  <span
                    style={{ background: "var(--main-color)" }}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      ></path>
                    </svg>
                  </span>
                  <span className="hidden lg:block text-sm leading-5 text-gray-500 pl-2">
                    Max money transaction
                  </span>
                </div>
                <div className="space-y-2 md:flex-1 md:flex md:flex-col md:justify-between lg:space-y-4">
                  <div className="space-y-1">
                    <p className="text-base leading-6 font-medium text-gray-900">
                      {this.props.transactionMaxAmount} rupees
                    </p>
                    <p className="text-sm leading-5 text-gray-500">
                      Max amount transaction at once
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="-m-3 p-3 flex flex-col justify-between space-y-6 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
            >
              <div className="space-x-4 flex md:h-full lg:flex-col lg:space-x-0 lg:space-y-4">
                <div className="flex-shrink-0 flex items-center">
                  <span
                    style={{ background: "var(--main-color)" }}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                      ></path>
                    </svg>
                  </span>
                  <span className="hidden lg:block text-sm leading-5 text-gray-500 pl-2">
                    Min money transaction
                  </span>
                </div>
                <div className="space-y-2 md:flex-1 md:flex md:flex-col md:justify-between lg:space-y-4">
                  <div className="space-y-1">
                    <p className="text-base leading-6 font-medium text-gray-900">
                      {this.state.transactionMinAmount} rupees
                    </p>
                    <p className="text-sm leading-5 text-gray-500">
                      Minimum amount transaction at once
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default Overview;
