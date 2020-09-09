import React from "react";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dates from "../../../utils/dates";
import dB from "../../../utils/db";
import { txnParserCalendarEventsInput } from "../../../utils/responseParser";

const db = new dB();
const localizer = BigCalendar.momentLocalizer(moment);
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const MyCalendar = props => (
  <div style={{ height: "600px" }}>
    <BigCalendar
      events={props.events}
      views={allViews}
      step={60}
      showMultiDayTimes
      max={dates.add(dates.endOf(new Date(2015, 17, 1), "day"), -1, "hours")}
      defaultDate={props.lastTxnDate}
      localizer={localizer}
    />
  </div>
);

class Calendar extends React.Component {
  state = {
    lastTxnDate: new Date(),
    events: []
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.onbeforeunload = function(e) {};
    db.get("userData")
      .then(res => res.userData.apiOriginalResponse)
      .then(res => txnParserCalendarEventsInput(res))
      .then(res => {
        console.log(res);
        this.setState({ events: res.events, lastTxnDate: res.lastTxnDate });
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    return (
      <React.Fragment>
        <p>Calendar view</p>
        <MyCalendar
          events={this.state.events}
          lastTxnDate={this.state.lastTxnDate}
        />
      </React.Fragment>
    );
  }
}
export default Calendar;
