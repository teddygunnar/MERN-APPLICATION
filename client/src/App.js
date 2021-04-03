import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import reactIcon from "./images/react-icon.png";
import Form from "./components/Form/Form";
import Books from "./components/Books/Books";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { getBooks } from "./actions/books";

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getBooks());
  }, [currentId, dispatch]);
  return (
    <Container maxwidth="lg">
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Typography variant="h2" align="center" className={classes.heading}>
          E-Library
        </Typography>
        <img
          className={classes.image}
          src={reactIcon}
          alt="reactIcon"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            className={classes.mainContainer}
            container
            justify="space-between"
            alignitems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Books setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
