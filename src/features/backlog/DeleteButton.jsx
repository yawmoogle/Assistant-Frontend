import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';

const DeleteButton = ({ loading, index, item, handleDeleteFunction }) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    setOpen(false);
    handleDeleteFunction(index);
  };

  return (
    <>
      <Button
        onClick={handleOpenDialog}
        sx={{ position: "absolute", top: 8, right: 8 }}
        disabled={loading}
      >
        Delete
      </Button>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this {item}? This action cannot be undone.
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
  loading: PropTypes.bool,
  index: PropTypes.number,
  item: PropTypes.string,
  handleDeleteFunction: PropTypes.func
}

