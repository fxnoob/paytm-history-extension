import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)'
  },
  paper: {
    textAlign: 'center',
    whiteSpace: 'nowrap',
  }
};
const SimpleAppBar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" style={{boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Paytm History
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const header = (props) => {
  const classes =  props.classes;
  return (
    <React.Fragment>
      <SimpleAppBar {...props}/>
      <Grid container>
        <Grid item xs={1}>

        </Grid>
        <Grid item xs={1}>
          <Link to="/option.html">Home</Link>
        </Grid>
        <Grid item xs={1}>
          <Link to="/calendar.html">Calendar View</Link>
        </Grid>
        <Grid item xs={1}>
          <Link to="/about.html">About</Link>
        </Grid>
        <Grid item xs={1}>

        </Grid>
        <Grid item xs={1}>

        </Grid>
        <Grid item xs={1}>

        </Grid>
        <Grid item xs={1}>

        </Grid>
        <Grid item xs={1}>

        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(header);
