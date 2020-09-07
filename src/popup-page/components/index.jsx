import React from "react";
import Home from "./home";
import Login from "./login";
import Db from "../../utils/db";

const db = new Db();

class Index extends React.Component {
  state = {
    isDataMounted: false
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    /** check if data was fetched previously */
    db.gets("dataMounted")
      .then(res => {
        console.log(res);
        if (res.dataMounted === true) {
          this.setState({ isDataMounted: true });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  gotoHome = () => {
    this.setState({ isDataMounted: true });
  };
  gotoLogin = () => {
    this.setState({ isDataMounted: false });
  };
  render() {
    return (
      <div style={{ width: "350px" }}>
        {this.state.isDataMounted ? (
          <Home gotoLogin={this.gotoLogin} />
        ) : (
          <Login gotoHome={this.gotoHome} />
        )}
        <div
          style={{
            textAlign: "center",
            textDecoration: "none",
            paddingTop: "1rem",
            paddingBottom: "0.2rem"
          }}
        >
          <a href="https://www.buymeacoffee.com/fxnoob" target="__blank">
            Buy me a Coffee.
          </a>
        </div>
      </div>
    );
  }
}

export default Index;
