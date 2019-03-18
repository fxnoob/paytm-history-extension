import React from 'react';
import { Nav, Site } from 'tabler-react'

const header = (props) => {
  return (
    <React.Fragment>
      <Site.Header notificationsTray href="https://www.facebook.com" imageURL="images/paytm-icon.png" alt="test">
      </Site.Header>
      <Site.Nav
        items={
          <React.Fragment>
            <Nav.Item hasSubNav value="Page One" icon="globe">
              <Nav.SubItem value="Sub Item 1" />
              <Nav.SubItem>Sub Item 2</Nav.SubItem>
              <Nav.SubItem icon="globe">Sub Item 3</Nav.SubItem>
            </Nav.Item>
            <Nav.Item to="http://www.example.com">Page Two</Nav.Item>
            <Nav.Item value="Page Three" />
            <Nav.Item active icon="user">
              Page Four
            </Nav.Item>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
}

export default header;
