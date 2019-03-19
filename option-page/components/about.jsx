import React  from "react";
import HeaderComponent from "./header";

export default class Calendar extends React.Component {
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
