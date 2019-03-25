import React, { Component } from "react";
import { BarChart } from "reaviz";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import Db  from '../../../src/utils/db';
import { Api } from "../../../src/utils/api";
import Modal from "../../../src/utils/modal";

const db = new Db();
const api = new Api();
const modal = new Modal();

const data = [
  { key: 'IDS', data: 1000 },
  { key: 'Malware', data: 5 },
  { key: 'DLP', data: 18 }
];
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing.unit* 2 ,
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    color: 'rgb(130, 130, 130)',
    backgroundColor: '#ffffff',
    marginBottom: theme.spacing.unit*3,
    marginTop: theme.spacing.unit * 3,
  },
  title:{
    marginLeft: theme.spacing.unit * 2,
  },
  content:{
    marginRight: theme.spacing.unit ,
  },
  paper: {
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Charts extends Component {
  state = {
    isDataMounted: false ,
    totalSpent: 0,
    totalAdded: 0,
    frequentTransactionTo: "",
    frequentTransactionFrom: ""
  };

  constructor(props) {
    super(props);
  }
  componentDidMount () {
    /** check if data was fetched previously */
    db.get("userData")
      .then(res=>{

      })
      .catch(e=>{
        console.log(e);
      })
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Divider/>
        <Grid container spacing={24}  className={classes.title}>
          <Button variant="contained" className={classes.button}>
            select year
          </Button>
        </Grid>
        <Divider/>
        <BarChart width={350} height={250} data={data} />
      </div>
    );
  }
}
export default withStyles(styles)(Charts);
