import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Home from "./home";
import Login from "./login";

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
       isDataMounted: false ,
    };
    constructor(props) {
        super(props);
        this.gotoHome = this.gotoHome.bind(this);
        this.gotoLogin = this.gotoLogin.bind(this);
    }
    componentDidMount () {
        /** check if data was fetched previously */
        db.get("dataMounted")
          .then(res=>{
              console.log(res)
              if (res.dataMounted === true) {
                  this.setState({isDataMounted: true});
              }
          })
          .catch(e=>{
              console.log(e);
          })
    }
    gotoHome() {
        this.setState({isDataMounted: true});
    }
    gotoLogin() {
        this.setState({isDataMounted: false});
    }
    render() {
        const { classes, theme } = this.props;
        return (
          <Card className={classes.card}>
              {this.state.isDataMounted ? (<Home gotoLogin={this.gotoLogin}/>):(<Login gotoHome={this.gotoHome}/>)}
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
