import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import Warning from '@material-ui/icons/Warning';
import Divider from '@material-ui/core/Divider'

import Db  from '../../src/utils/db';
import {Api } from "../../src/utils/api";

const styles = theme => ({
  card: {
    display: 'flex',
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
  progress: {
    margin: theme.spacing.unit ,
  },
  link: {
    margin: theme.spacing.unit,
    fontSize: "38px"
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
const api = new Api();

class  MediaControlCard extends React.Component{
  state = {
    actionLabel: "FETCH" ,
    isApiResponseError: false ,
    isApiResponseSuccess: false ,
    showFetchActionLabel: true ,
    showFetchActionLoadingIcon: false ,
    showFetchActionErrorIcon: false ,
    loginLink: "javascript:;" ,
    message: ""
  };
  constructor(props) {
    super(props);
    this.fetchAction = this.fetchAction.bind(this);
  }
  componentDidMount () {
  }
  fetchAction() {
    this.setState({showFetchActionLabel: false,showFetchActionLoadingIcon: true , actionLabel: "fetching.."});
    api.fetchHistory(api.historyApiEndpoint)
      .then(res=> {
        let totalSpent = 0;
        console.log(api.HistoryData);
        this.setState({
          actionLabel: "",
          showFetchActionLoadingIcon: false ,
          showFetchActionErrorIcon: false ,
          message: "Fetched details"
        });
        setTimeout(()=>{
          this.setState({message: ""});
        },5000);
        const result = api.HistoryData.map(hd=> {
          hd.orders.map(order=> {
            totalSpent+= order.amount;
          });
        });
        console.log(totalSpent);
        db.set({
          /** 0: if not logged in. 1 if logged in */
          dataMounted: true,
          /** last time when apis was hit successfully */
          lastChecked: +new Date,
          /** user data fetched from apis */
          userData: {
            /**username not mandatory*/
            userName: null,
            /** total spent money by user based on history calculations */
            totalSpent: totalSpent,
            /** extra user details */
            extDetails: null,
            /** Api's original response*/
            apiOriginalResponse: api.HistoryData
          }
        });
      })
      .catch(e=>{
          console.log("error",e);
          this.setState({
            actionLabel: "Login to paytm",
            showFetchActionLoadingIcon: false ,
            showFetchActionErrorIcon: true ,
            loginLink: "https://paytm.com/",
            message: "Please login to paytm. first!"
          })
        setTimeout(()=>{
          this.setState({message: ""});
        },5000);
      });
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
            Click 'Fetch' button
            to see total money u have spent.
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Link href={this.state.loginLink} target="_blank" onClick={this.fetchAction} className={classes.link}>
            {this.state.actionLabel} {this.state.showFetchActionLoadingIcon && <CircularProgress className={classes.progress} />}
            {this.state.showFetchActionErrorIcon && <Warning className={classes.progress} />}
          </Link>
        </div>
        <Divider/>
        <Typography variant="subtitle1" color="textSecondary">
          {this.state.message}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MediaControlCard);
