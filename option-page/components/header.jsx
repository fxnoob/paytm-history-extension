import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { Link } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider'

const styles = {
  root: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  grow: {
    flexGrow: 1,
    textAlign: 'center'
  },
  button: {
    width: '100%'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends React.Component{
  state = {
    left: false
  };
  constructor (props) {
    super(props);
  }
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button>
            <Typography variant="h6" color="inherit" className={classes.grow}>
             Quick Links
            </Typography>
          </ListItem>
          <ListItem button>
            <Button variant="outlined" color="secondary" className={classes.button}>
              <Link to="/option.html">Home</Link>
            </Button>
          </ListItem>
          <Divider/>
          <ListItem button>
            <Button variant="outlined" color="secondary" className={classes.button}>
              <Link to="/calendar.html">Calendar View</Link>
            </Button>
          </ListItem>
          <Divider/>
          <ListItem button>
            <Button variant="outlined" color="secondary" className={classes.button}>
              <Link to="/about.html">About</Link>
            </Button>
          </ListItem>
          <Divider/>
        </List>
      </div>
    );
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{color: '#828282',backgroundColor: '#ffffff'}}>
          <Toolbar>
            <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Paytm History
            </Typography>
            <Button color="inherit">Refresh</Button>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
