import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import {XYPlot, XAxis, YAxis, HorizontalGridLines,LabelSeries,LineSeries,VerticalBarSeries,ChartLabel} from 'react-vis';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import Modal from "../../../src/utils/modal";

const modal = new Modal();
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing.unit* 2 ,
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
  title:{
    opacity: 0,
    marginLeft: theme.spacing.unit * 2,
  },
  content:{
    marginRight: theme.spacing.unit ,
  },
  paper: {
    cursor: 'hand',
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
class Overview extends React.Component {
  state = {
    totalSpent: 0,
    totalAdded: 0,
    frequentTransactionTo: 0,
    frequentTransactionFrom: 0,
    open: false,
    scroll: 'paper',
    title: '',
    frequentTransactiotoData: [],
    frequentTransactiofromData: [],
    frequentTransactiotoDataPlot: [],
    frequentTransactiofromDataPlot: [],
  };
  componentDidMount () {
    const { totalSpent , totalAdded, frequentTransactionTo, frequentTransactionFrom  } = this.props;
    console.log(frequentTransactionTo);
    this.setState({
      totalSpent: totalSpent,
      totalAdded: totalAdded,
      frequentTransactionTo: modal.getMax(frequentTransactionTo),
      frequentTransactionFrom: modal.getMax(frequentTransactionFrom)
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    if (this.props !== nextProps) {
      const { totalSpent,totalAdded,frequentTransactionTo,frequentTransactionFrom } = nextProps;
      this.setState({
        totalSpent: totalSpent,
        totalAdded: totalAdded,
        frequentTransactionTo: modal.getMax(frequentTransactionTo),
        frequentTransactionFrom: modal.getMax(frequentTransactionFrom),
        frequentTransactiotoData: frequentTransactionTo,
        frequentTransactiofromData: frequentTransactionFrom,
      })
    }
  }
  handleClickOpen = scroll => (overViewFor) => {
    let title = '', plotData = []
    if(overViewFor === 'frequentTransactionTo') {
      title = 'Transactions frequencies'
      let i=0;
      plotData = Object.entries(this.state.frequentTransactiotoData).map(point=>{
        return {
          x: i++,
          y: Number(point[1]),
          label: String(Math.round(point[1])) + ' times',
          rotation: 270
        }
      })
    }
    this.setState({ open: true, scroll,title: title,frequentTransactiotoDataPlot: plotData });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleClickOnOverview(str) {
    this.handleClickOpen('paper')(str)
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Dialog
          maxWidth="lg"
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">{this.state.title}</DialogTitle>
          <DialogContent>
            <XYPlot
              width={600}
              height={300}>
              <HorizontalGridLines />
              <LineSeries
                data={this.state.frequentTransactiotoDataPlot}/>
              <YAxis />
              <ChartLabel
                text="time"
                className="alt-x-label"
                includeMargin={false}
                xPercent={0.025}
                yPercent={1.01}
              />
              <ChartLabel
                text="transaction frequency"
                className="alt-y-label"
                includeMargin={false}
                xPercent={0.06}
                yPercent={0.06}
                style={{
                  transform: 'rotate(-90)',
                  textAnchor: 'end'
                }}
              />
            </XYPlot>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              close
            </Button>
          </DialogActions>
        </Dialog>
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
                {Math.round(this.state.totalSpent)} ₹
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                Total spent
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="display1" gutterBottom>
                {Math.round(this.state.totalAdded)} ₹
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                Total added
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="display1" gutterBottom>
                {this.state.frequentTransactionFrom?this.state.frequentTransactionFrom:'∞'}
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                Frequent transaction from
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper} onClick={()=>{this.handleClickOnOverview('frequentTransactionTo')}}>
              <Typography component="h2" variant="display1" gutterBottom>
                {this.state.frequentTransactionTo?this.state.frequentTransactionTo:'∞'}
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
