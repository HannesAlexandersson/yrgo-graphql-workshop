import { useState } from "react";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";

export const AddBookDialog = ({
  authors,
  onSubmit,
  modalOpen,
  toggleModal,
}) => {
  const [authorId, setAuthorID] = useState("");
  const handleChange = (event) => {
    setAuthorID(event.target.value);

    setFormValues((prevState) => {
      return { ...prevState, authorId: event.target.value };
    });
  };
  
  const handleClose = () => {
    toggleModal(false);
    setAuthorID("");
    setFormValues({
      authorId: null,
      bookTitle: null,
    });
  };

  const [formValues, setFormValues] = useState({
    authorId: null,
    bookTitle: null,
  });

  return (
    <Dialog open={modalOpen} onClose={handleClose}>
      <DialogTitle>Add a book</DialogTitle>
      <DialogContent sx={{ minWidth: 420 }}>
        <DialogContentText>Add a book to your database.</DialogContentText>
        <FormControl fullWidth>
          <InputLabel>Author</InputLabel>
          <Select
            value={authorId}
            onChange={handleChange}
            label="Author"
            required
          >
            {authors?.map((author) => {
              return (
                <MenuItem key={author._id} value={author._id}>
                  {author.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            required
            onChange={(e) =>
              setFormValues((prevState) => {
                return { ...prevState, bookTitle: e.target.value };
              })
            }
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          disabled={!formValues.authorId || !formValues.bookTitle}
          onClick={() =>
            onSubmit({
              authorId: formValues.authorId,
              bookTitle: formValues.bookTitle,
            })
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
