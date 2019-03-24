import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing.unit* 2 ,
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
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
class Overview extends React.Component {
  render() {
    const { classes, totalSpent , totalAdded, frequentTransactionTo, frequentTransactionFrom  } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}  className={classes.title}>
          <Typography component="h2" variant="display1" gutterBottom>
            Overview
          </Typography>
        </Grid>
        <Divider/>
        <Grid container spacing={24}  className={classes.content}>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="display1" gutterBottom>
                {Math.round(totalSpent)} ₹
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                Total spent
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="display1" gutterBottom>
                {Math.round(totalAdded)} ₹
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                Total added
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="display1" gutterBottom>
                {frequentTransactionFrom}
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                Frequent transaction from
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="display1" gutterBottom>
                {frequentTransactionTo}
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                Frequent transaction to
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="display1" gutterBottom>
                ∞
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                coming soon..
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="display1" gutterBottom>
                ∞
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                coming soon..
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Overview);
