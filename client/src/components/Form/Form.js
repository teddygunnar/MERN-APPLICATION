import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { addBook, updateBook } from "../../actions/books";
import { useSelector } from "react-redux";
const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const book = useSelector((state) =>
    currentId ? state.books.find((b) => b._id === currentId) : null
  );
  const dispatch = useDispatch();
  const [bookData, setBookData] = useState({
    author: "",
    title: "",
    publisher: "",
    year: "",
    genre: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (book) setBookData(book);
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateBook(currentId, bookData));
    } else {
      dispatch(addBook(bookData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(0);
    setBookData({
      author: "",
      title: "",
      publisher: "",
      year: "",
      genre: "",
      selectedFile: "",
    });
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Adding"} Books
        </Typography>
        <TextField
          name="author"
          variant="outlined"
          label="Author"
          fullWidth
          value={bookData.author}
          onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={bookData.title}
          onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
        />
        <TextField
          name="publisher"
          variant="outlined"
          label="Publisher"
          fullWidth
          value={bookData.publisher}
          onChange={(e) =>
            setBookData({ ...bookData, publisher: e.target.value })
          }
        />
        <TextField
          name="year"
          variant="outlined"
          label="Year"
          fullWidth
          value={bookData.year}
          onChange={(e) => setBookData({ ...bookData, year: e.target.value })}
        />
        <TextField
          name="genre"
          variant="outlined"
          label="Genre"
          fullWidth
          value={bookData.genre}
          onChange={(e) =>
            setBookData({ ...bookData, genre: e.target.value.split(",") })
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setBookData({ ...bookData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
