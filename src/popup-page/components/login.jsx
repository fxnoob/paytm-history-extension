import React from "react";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Db from "../../utils/db";

const db = new Db();

class Login extends React.Component {
  state = {
    actionLabel: "Fetch stats",
    isApiResponseError: false,
    isApiResponseSuccess: false,
    showFetchActionLabel: true,
    showFetchActionLoadingIcon: false,
    showFetchActionErrorIcon: false,
    loginLink: "javascript:;",
    message: "",
    fetching: false
  };
  constructor(props) {
    super(props);
    this.port = "";
    this.fetchAction = this.fetchAction.bind(this);
  }

  componentDidMount() {
    /** https://stackoverflow.com/questions/13546778/how-to-communicate-between-popup-js-and-background-js-in-chrome-extension */
    this.port = chrome.extension.connect({
      name: "paytm history"
    });
    this.port.onMessage.addListener(response => {
      if (response.action === "fetchTxHistory") {
        if (response.status === "initiated") {
          this.setState({
            showFetchActionLabel: false,
            showFetchActionLoadingIcon: true,
            fetching: true,
            message: "fetching details..",
            actionLabel: "fetching.."
          });
        } else if (response.status === "success") {
          this.setState({
            actionLabel: "",
            showFetchActionLoadingIcon: false,
            showFetchActionErrorIcon: false,
            fetching: false,
            message: "Fetched details"
          });
          /** goto homepage if got successful response */
          this.props.gotoHome();
          setTimeout(() => {
            this.setState({ message: "", showFetchActionErrorIcon: false });
          }, 5000);
        } else if (response.status === "error") {
          this.setState({
            actionLabel: "Login to paytm",
            showFetchActionLoadingIcon: false,
            showFetchActionErrorIcon: true,
            fetching: false,
            loginLink: "https://paytm.com/",
            message: "Please login to paytm. first!"
          });
          setTimeout(() => {
            this.setState({ message: "" });
          }, 5000);
        }
      }
    });
    /** check if data was fetched previously just before this componentDidMount*/
    db.get("dataMounted")
      .then(res => {
        console.log(res);
        if (res.dataMounted === true) {
          this.props.gotoHome();
        }
      })
      .catch(e => {});
    /** get current state of fetching */
    db.get("fetchTxHistoryStatus")
      .then(res => {
        if (res.fetchTxHistoryStatus === "initiated") {
          this.setState({
            showFetchActionLabel: false,
            showFetchActionLoadingIcon: true,
            actionLabel: "fetching.."
          });
        }
      })
      .catch(e => {});
  }
  fetchAction() {
    this.port.postMessage({ action: "fetchTxHistory" });
  }
  render() {
    const infoText =
      "This extension will help you in keeping an eye on your Paytm digital wallet. Using this app you will be able to view statistics like : how much money have you spent from paytm wallet and many other interesting statistics.\n";

    return (
      <main
        style={{ minHeight: "200px" }}
        className="mt-2 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28"
      >
        <div className="text-center">
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
            Paytm
            <br className="xl:hidden" />
            <span style={{ color: "var(--main-color)" }}>Statistics</span>
          </h2>
          <p
            style={{ color: "#808080e0", height: "9rem" }}
            className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            {this.state.fetching || this.state.showFetchActionErrorIcon
              ? ""
              : infoText}
            {this.state.showFetchActionLoadingIcon && <Loader />}
            {this.state.showFetchActionErrorIcon && <Error />}
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-full shadow">
              <button
                disabled={this.state.fetching}
                onClick={this.fetchAction}
                className="rounded-full w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600  focus:outline-none  transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10 btn"
              >
                {this.state.actionLabel}
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Login;
