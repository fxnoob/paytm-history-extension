import React from "react";
import Db from "../../utils/db";
import { getDurationFromDate } from "../../utils/dateParser";

const db = new Db();

class Home extends React.Component {
  state = {
    spentMoney: 0,
    lastChecked: "00000"
  };
  constructor(props) {
    super(props);
    this.refreshDetails = this.refreshDetails.bind(this);
  }
  componentDidMount() {
    db.get(["userData", "lastChecked", "stats"])
      .then(res => {
        console.log(res);
        const duration = getDurationFromDate(res.lastChecked);
        this.setState({
          spentMoney: res.userData.totalSpent,
          lastChecked: duration
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshDetails() {
    db.set({ dataMounted: false })
      .then(res => {
        this.props.gotoLogin();
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    return (
      <div class="" style={{ minHeight: "200px" }}>
        <div class="p-8 bg-white">
          <div class="max-w-7xl mx-auto">
            <div class="lg:flex lg:items-center lg:justify-between">
              <div class="flex-1 min-w-0">
                <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                  Paytm
                  <br className="xl:hidden" />
                  <span style={{ color: "var(--main-color)" }}>Statistics</span>
                </h2>
                <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
                  <div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
                    <svg
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    #paytmkaro
                  </div>
                  <div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
                    <svg
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    {Math.round(this.state.spentMoney)} rupees spent
                  </div>
                  <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                    <svg
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    last checked {this.state.lastChecked}
                  </div>
                </div>
              </div>
              <div class="mt-5 flex lg:mt-0 lg:ml-4">
                <span class="sm:ml-3 shadow-sm rounded-md">
                  <a
                    href="/option.html"
                    target="_blank"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white focus:outline-none transition duration-150 ease-in-out btn"
                  >
                    Full report
                  </a>
                  <button
                    type="button"
                    style={{ marginLeft: "1rem" }}
                    onClick={this.refreshDetails}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white focus:outline-none transition duration-150 ease-in-out btn-lite"
                  >
                    refresh
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
