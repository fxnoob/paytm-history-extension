import React from 'react';
import { Nav, Site } from 'tabler-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const header = (props) => {
  return (
    <React.Fragment>
      <Site.Header notificationsTray href="https://www.facebook.com" imageURL="images/paytm-icon.png" alt="test">
      </Site.Header>
      <Site.Nav
        items={
          <React.Fragment>
            <Nav.Item><Link to="/option.html">Home</Link></Nav.Item>
            <Nav.Item><Link to="/calendar.html">Calendar View</Link></Nav.Item>
            <Nav.Item><Link to="/about.html">About</Link></Nav.Item>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
}

export default header;
