import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Db  from '../../src/utils/db';
import { Cookie } from "../../src/utils/cookie";
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
    isDataMounted: false ,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    // api.fetchHistory(api.historyApiEndpoint)
    //   .then(res=> {
    //       console.log(api.HistoryData);
    //   })
    //   .catch(e=>{
    //       console.log("error",e);
    //       console.log(api.HistoryData);
    //   });
    /** check if data was fetched previously */
    // db.get("dataMounted")
    //   .then(res=>{
    //     if (res === true) {
    //       this.setState({isDataMounted: true});
    //     }
    //   })
    //   .catch(e=>{
    //     console.log(e);
    //   })
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
              Click 'Login' button
              to see total money u have spent.
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="Play/pause">
              Login
            </IconButton>
          </div>
        </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MediaControlCard);
