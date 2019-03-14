import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Home from "./home";
import Login from "./login";

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
        db.get("dataMounted")
          .then(res=>{
              if (res === true) {
                  this.setState({isDataMounted: true});
              }
          })
          .catch(e=>{
              console.log(e);
          })
    }
    render() {
        const { classes, theme } = this.props;
        return (
          <Card className={classes.card}>
              {this.state.isDataMounted ? (<Home/>):(<Login/>)}
              <CardMedia style={{backgroundSize: 'contain'}}
                         className={classes.cover}
                         image="/images/paytm-icon.png"
                         title="Live from space album cover"
              />
          </Card>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MediaControlCard);
