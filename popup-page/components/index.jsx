import React from "react";
import Card from "@material-ui/core/Card";
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
      <Card>
        {this.state.isDataMounted ? (
          <Home gotoLogin={this.gotoLogin} />
        ) : (
          <Login gotoHome={this.gotoHome} />
        )}
      </Card>
    );
  }
}

export default MediaControlCard;
