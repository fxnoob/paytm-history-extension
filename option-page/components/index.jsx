import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./home/home";
import About from "./about";
import Calendar from "./calendar/calendar"

import Db  from '../../src/utils/db';
import { Api } from "../../src/utils/api";

const db = new Db();
const api = new Api();

class  Index extends React.Component{
  state = {
    isDataMounted: false ,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount () {
  }

  render() {
    return (
      <Router>
          <Route path="/option.html" exact component={Home}/>
          <Route path="/about.html" component={About} />
        <Route path="/calendar.html" component={Calendar} />
      </Router>
    );
  }
}

export default Index;
