import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';

const DeleteButton = ({ index, handleDeleteFunction }) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true); // Open the confirmation dialog
  };

  const handleCloseDialog = () => {
    setOpen(false); // Close the dialog without deleting
  };

  const handleConfirmDelete = () => {
    setOpen(false); // Close the dialog
    handleDeleteFunction(index); // Call the delete function
  };

  return (
    <>
      <Button
        onClick={handleOpenDialog}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        Delete
      </Button>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user story? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;
DeleteButton.propTypes = {
    index: PropTypes.number,
    handleDeleteUserStory: PropTypes.func
}

