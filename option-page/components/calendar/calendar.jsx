import React  from "react";
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { withStyles } from '@material-ui/core/styles';
import HeaderComponent from "../header";
import dates from '../../../src/utils/dates';
import dB from '../../../src/utils/db';
import { txnParserCalendarEventsInput } from '../../../src/utils/responseParser';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

const db = new dB();
const localizer = BigCalendar.momentLocalizer(moment)
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

const styles = theme => ({
  title:{
    flexGrow: 1,
    marginRight: theme.spacing.unit* 2 ,
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  }
});

const MyCalendar = props => (
  <div style={{height: '600px'}}>
    <BigCalendar
      events={props.events}
      views={allViews}
      step={60}
      showMultiDayTimes
      max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
      defaultDate={props.lastTxnDate}
      localizer={localizer}
    />
  </div>
)

class Calendar extends React.Component {
  state = {
    lastTxnDate: new Date(),
    events: []
  }
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    db.get("userData")
      .then(res=>res.userData.apiOriginalResponse)
      .then(res=> txnParserCalendarEventsInput(res))
      .then(res=>{
        console.log(res);
        this.setState({events: res.events, lastTxnDate: res.lastTxnDate});
      })
      .catch(e=>{
        console.log(e);
      })
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <HeaderComponent />
        <div className={classes.title}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography component="h2" variant="display1" gutterBottom>
                Calendar view
              </Typography>
            </Grid>
            <Divider/>
            <Grid item xs={12}>
              <MyCalendar events={this.state.events} lastTxnDate={this.state.lastTxnDate}/>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
      );
  }
}
export default withStyles(styles)(Calendar);
