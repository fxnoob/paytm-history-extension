import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./home/home";
import About from "./about";
import Calendar from "./calendar/calendar";

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
   const props = this.props;
    return (
      <Router>
        <Route
          path="/option.html"
          render={(props) => <Home {...props}/>}
        />
        <Route
          path="/about.html"
          render={(props) => <About {...props}/>}
        />
        <Route
          path="/calendar.html"
          render={(props) => <Calendar {...props}/>}
        />
      </Router>
    );
  }
}

export default Index;
