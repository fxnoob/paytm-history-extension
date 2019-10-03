import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Db from "../../src/utils/db";

const styles = theme => ({
  card: {
    display: "flex"
  },
  RefreshShareDiv: {
    fontSize: "14px",
  },
  shareLink: {
    marginLeft: theme.spacing.unit
  },
  linkR: {
    fontSize: "14px"
  },
  link: {
    fontSize: "18px"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    minWidth: "200px"
  },
  content: {
    flex: "1 0 auto",
    minWidth: "200px"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
  },
  playIcon: {
    height: 38,
    width: 38
  }
});
const db = new Db();

class MediaControlCard extends React.Component {
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
        const currDate = +new Date();
        let difference = currDate - res.lastChecked;
        let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
        let lastCheckMesssage = "";
        if (daysDifference === 0) {
          difference -= daysDifference * 1000 * 60 * 60 * 24;
          const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
          if (hoursDifference === 0) {
            difference -= hoursDifference * 1000 * 60 * 60;
            const minutesDifference = Math.floor(difference / 1000 / 60);
            if (minutesDifference === 0) {
              difference -= minutesDifference * 1000 * 60;
              const secondsDifference = Math.floor(difference / 1000);
              lastCheckMesssage = secondsDifference + " seconds ago";
            } else {
              lastCheckMesssage = minutesDifference + " minute ago";
            }
          } else {
            lastCheckMesssage = hoursDifference + " hour ago";
          }
        } else lastCheckMesssage = daysDifference + " day ago";
        this.setState({
          spentMoney: res.userData.totalSpent,
          lastChecked: lastCheckMesssage
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
    const { classes } = this.props;
    return (
      <CardContent className={classes.content}>
        <Typography component="h6" variant="h6">
          Paytm History
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {Math.round(this.state.spentMoney)} ₹ spent.
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          style={{ fontSize: "inherit" }}
        >
          last checked {this.state.lastChecked}.
        </Typography>
        <Link href="" onClick={this.refreshDetails} className={classes.linkR}>
          refresh
        </Link>
        <br/>
        <Link href="/option.html" target="_blank" className={classes.link}>
          Detailed Report
        </Link>
      </CardContent>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MediaControlCard);
