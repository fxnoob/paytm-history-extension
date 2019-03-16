import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Db  from '../../src/utils/db';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '200px'
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});
const db = new Db();

class  MediaControlCard extends React.Component{
  state = {
    isDataMounted: false ,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    /** check if data was fetched previously */
    db.get("dataMounted")
      .then(res=>{
        console.log(res)
        if (res.dataMounted === true) {
          this.setState({isDataMounted: true});
        }
      })
      .catch(e=>{
        console.log(e);
      })
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        hey
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MediaControlCard);
