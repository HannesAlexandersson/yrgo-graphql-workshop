import { useState } from "react";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const AddAuthorDialog = ({ onSubmit, modalOpen, toggleModal }) => {
  const [authorName, setAuthorName] = useState("");

  const handleChange = (event) => {
    setAuthorName(event.target.value);
  };

  return (
    <Dialog open={modalOpen} onClose={() => toggleModal(false)}>
      <DialogTitle>Add an author</DialogTitle>
      <DialogContent sx={{ minWidth: 420 }}>
        <DialogContentText>Add an author to your database.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          required
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleModal(false)}>Cancel</Button>
        <Button disabled={!authorName} onClick={() => onSubmit(authorName)}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
