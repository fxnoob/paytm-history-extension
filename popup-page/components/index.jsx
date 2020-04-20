import React from "react";
import Home from "./home";
import Login from "./login";
import Db from "../../src/utils/db";

const db = new Db();

class MediaControlCard extends React.Component {
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
      <React.Fragment>
        {this.state.isDataMounted ? (
          <Home gotoLogin={this.gotoLogin} />
        ) : (
          <Login gotoHome={this.gotoHome} />
        )}
        <div style={{textAlign:'center', textDecoration: 'none'}}>
          <a href="https://www.buymeacoffee.com/fxnoob" target="__blank">Buy me a Coffee.</a>
        </div>
      </React.Fragment>
    );
  }
}

export default MediaControlCard;
