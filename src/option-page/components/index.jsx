import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Home from "./home/home";
import About from "./about";
import Calendar from "./calendar/calendar";
import Lottie from "lottie-react-web";
import loader from "./loader";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loaded: true });
    }, 3000);
  }

  render() {
    return this.state.loaded ? (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/calendar" component={Calendar} />
        </Switch>
      </Router>
    ) : (
      <React.Fragment>
        <Lottie
          options={{
            animationData: loader
          }}
        />
      </React.Fragment>
    );
  }
}
