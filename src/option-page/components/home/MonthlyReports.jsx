import React, { Component } from "react";
import Divider from "@material-ui/core/Divider";
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
    return (
      <>
        <Divider />
        <div
          className="bg-white"
          style={{ paddingTop: "2rem", background: "aliceblue" }}
        >
          <div className="max-w-7xl mx-auto  px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
            <p className="text-3xl leading-6 font-medium text-gray-900">
              Click on any year to see monthly transactions
            </p>
            <div className="pt-4 flex space-x-5 items-center">
              {this.state.graphData1 &&
                Object.keys(this.state.graphData1).map(year => {
                  return (
                    <span
                      key={year}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.changeYear(year);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md   bg-white    transition duration-150 ease-in-out btn"
                    >
                      {year}
                    </span>
                  );
                })}
            </div>
            <div className="mt-4">
              <MUIDataTable
                title={`${this.state.monthlyExpensedataTableTitle}(${this.state.selectedYear})`}
                data={this.state.monthlyExpenseData}
                columns={columns}
                options={options}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Charts;
