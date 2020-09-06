import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HeaderComponent from "./header";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ImageHs from "../image_hs.png";
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  }
});

function About(props) {
  const { classes } = props;
  const gotoGithub = () => {
    window.location.href = "https://github.com/fxnoob";
  };
  return (
    <React.Fragment>
      <HeaderComponent />
      <Grid container={12}>
        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Hitesh Saini"
                height="140"
                image={ImageHs}
                title="Hitesh Saini"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Hitesh Saini
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  “No significant learning occurs without a significant
                  relationship.”
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary" onClick={gotoGithub}>
                Github
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default withStyles(styles)(About);
