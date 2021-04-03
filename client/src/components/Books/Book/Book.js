import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";

import { deleteBook, borrowBook } from "../../../actions/books";

const Book = ({ book, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={book.selectedFile}
        title={book.title}
      />
      <div className={classes.overlay}></div>
      <div className={classes.overlay2}>
        <Button
          className={classes.button}
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(book._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {book.genre.map((genres) => `#${genres} `)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {book.year}
        </Typography>
      </div>
      <CardContent>
        <Typography variant="h6">{book.title}</Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.details2}
        >
          {book.author}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(borrowBook(book._id))}
        >
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Status &nbsp; {book.reservationStatus}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(deleteBook(book._id));
          }}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Book;
