import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { DeleteCongregationProps } from './index.types';
import useDeleteCongregation from './useDeleteCongregation';

const DeleteCongregation = (props: DeleteCongregationProps) => {
  const { handleClose, handleConfirm, handleOpen, open } =
    useDeleteCongregation(props);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-congregation-title"
        aria-describedby="delete-congregation-description"
      >
        <DialogTitle id="delete-congregation-title">
          Delete congregation confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-congregation-description">
            Are you sure you want to delete this congregation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Stop
          </Button>
          <Button onClick={handleConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        color="error"
        onClick={handleOpen}
        startIcon={<Delete />}
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteCongregation;
