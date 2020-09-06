import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import introJs from "../../../node_modules/intro.js/intro";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";

const Header = ({ history }) => {
  const help = () => {
    introJs().start();
  };
  const buyCoffee = () => {
    window.location.href = "https://www.buymeacoffee.com/fxnoob";
  };
  return (
    <AppBar
      elevation={0}
      position="static"
      style={{ color: "#828282", backgroundColor: "#ffffff" }}
    >
      <Toolbar>
        <IconButton
          onClick={() => history.push("/option.html")}
          color="inherit"
          aria-label="Menu"
        >
          PAYTM STATS
        </IconButton>
        <MenuItem onClick={() => history.push("/calendar.html")}>
          Calendar view
        </MenuItem>
        <MenuItem onClick={() => history.push("/about.html")}>About</MenuItem>
        <MenuItem color="inherit" onClick={buyCoffee}>
          Buy me a Coffee
        </MenuItem>
        <MenuItem color="inherit" onClick={help}>
          Help
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
