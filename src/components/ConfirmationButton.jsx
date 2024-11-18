import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';

const ConfirmationButton = ({ editingIndex, index, handleSaveClick, handleEditClick, story }) => {
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    if (editingIndex === index) {
      setOpen(true); // Open confirmation dialog for Save action
    } else {
      handleEditClick(index, story); // Directly handle Edit action
    }
  };

  const handleConfirmSave = () => {
    setOpen(false);
    handleSaveClick(index); // Proceed with the Save action after confirmation
  };

  const handleClose = () => {
    setOpen(false); // Close dialog without saving
  };

  return (
    <>
      <Button
        onClick={handleButtonClick}
        sx={{ position: 'absolute', top: 8, right: 80 }}
      >
        {editingIndex === index ? 'Save' : 'Edit'}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Save</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to save this change?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmSave} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationButton;
ConfirmationButton.propTypes = {
    editingIndex: PropTypes.number,
    index: PropTypes.number,
    handleSaveClick: PropTypes.func,
    handleEditClick: PropTypes.func,
    story: PropTypes.object
}