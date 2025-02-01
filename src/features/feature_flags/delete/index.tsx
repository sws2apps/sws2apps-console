import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { FeatureFlagDeleteProps } from './index.types';
import useDelete from './useDelete';

const FeatureFlagDelete = (props: FeatureFlagDeleteProps) => {
  const { handleClose, handleConfirm, handleOpen, open } = useDelete(props);

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={handleOpen}
        startIcon={<Delete />}
      >
        Delete
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-user-title"
        aria-describedby="delete-user-description"
      >
        <DialogTitle id="delete-user-title">
          Delete flag confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-user-description">
            Are you sure you want to delete this flag?
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
    </>
  );
};

export default FeatureFlagDelete;
