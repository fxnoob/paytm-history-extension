import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Db  from '../../src/utils/db';
import { Cookie } from "../../src/utils/cookie";
import {Api } from "../../src/utils/api";

const styles = theme => ({
  card: {
    display: 'flex',
  },
  link: {
    margin: theme.spacing.unit,
    fontSize: "18px"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '200px'
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});
const db = new Db();
const cookie = new Cookie();
const api = new Api();

class  MediaControlCard extends React.Component{
  state = {
    spentMoney: 0
  };
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    db.get("userData")
      .then(res=> {
        this.setState({spentMoney: res.userData.totalSpent})
      })
      .catch(e=>{
        console.log(e);
      })
  }
  render() {
    const { classes, theme } = this.props;
    return (
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h6" variant="h6">
              Paytm History
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Rs.{this.state.spentMoney} Spent.
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <Link href="/details.html" target="_blank" className={classes.link}>
              Detailed Report
            </Link>
          </div>
        </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MediaControlCard);
