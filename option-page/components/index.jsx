import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Home from "./home/home";
import About from "./about";
import Db  from '../../src/utils/db';
import { Api } from "../../src/utils/api";

const db = new Db();
const api = new Api();

class  MediaControlCard extends React.Component{
  state = {
    isDataMounted: false ,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    api.fetchTxHistory()
      .then(res=> {
        console.log(api.TxHistoryData);
      })
      .catch(e=>{
        console.log(e);
      })

  }

  render() {
    return (
      <Router>
          <Route path="/option.html" exact component={Home}/>
          <Route path="/about.html" component={About} />
      </Router>
    );
  }
}

export default MediaControlCard;
