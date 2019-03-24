import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import Warning from '@material-ui/icons/Warning';
import Divider from '@material-ui/core/Divider'

import Db  from '../../src/utils/db';

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
    this.port = '';
    this.fetchAction = this.fetchAction.bind(this);
  }

  componentDidMount () {
    /** https://stackoverflow.com/questions/13546778/how-to-communicate-between-popup-js-and-background-js-in-chrome-extension */
    this.port = chrome.extension.connect({
      name: "paytm history"
    });
    this.port.onMessage.addListener((response) => {
      if (response.action === 'fetchTxHistory') {
        if (response.status === 'initiated') {
          this.setState({showFetchActionLabel: false,showFetchActionLoadingIcon: true , actionLabel: "fetching.."});
        } else if (response.status === 'success') {
          this.setState({ actionLabel: "", showFetchActionLoadingIcon: false , showFetchActionErrorIcon: false , message: "Fetched details" });
          /** goto homepage if got successful response */
          this.props.gotoHome();
          setTimeout(()=>{this.setState({message: ""});},5000);
        } else if (response.status === 'error') {
          this.setState({ actionLabel: "Login to paytm", showFetchActionLoadingIcon: false , showFetchActionErrorIcon: true , loginLink: "https://paytm.com/", message: "Please login to paytm. first!"})
          setTimeout(()=>{this.setState({message: ""});},5000);
        }
      }
    });
    /** check if data was fetched previously just before this componentDidMount*/
    db.get("dataMounted")
      .then(res=>{
        console.log(res)
        if (res.dataMounted === true) {
          this.props.gotoHome();
        }
      })
      .catch(e=>{});
    /** get current state of fetching */
    db.get("fetchTxHistoryStatus")
      .then(res=>{
        if (res.fetchTxHistoryStatus === 'initiated') {
          this.setState({showFetchActionLabel: false,showFetchActionLoadingIcon: true , actionLabel: "fetching.."});
        }
      })
      .catch(e=>{});
  }
  fetchAction() {
    this.port.postMessage({action: "fetchTxHistory"});
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
