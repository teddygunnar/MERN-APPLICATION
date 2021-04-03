import React from "react";
import Book from "./Book/Book";
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";
import { useSelector } from "react-redux";

const Books = ({ setCurrentId }) => {
  const classes = useStyles();
  const books = useSelector((state) => state.books);

  console.log(books);
  return !books.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {books.map((book) => (
        <Grid key={book._id} item xs={12} sm={6}>
          <Book book={book} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Books;
