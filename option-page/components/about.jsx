import React  from "react";
import HeaderComponent from "./header";

export default class About extends React.Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {}
  render() {
    return (
      <HeaderComponent/>
    );
  }
}
