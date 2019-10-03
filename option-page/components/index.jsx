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
    return (
      <Router>
        <Route path="/option.html" exact component={Home} />
        <Route path="/about.html" component={About} />
        <Route path="/calendar.html" component={Calendar} />
      </Router>
    );
  }
}

export default Index;
