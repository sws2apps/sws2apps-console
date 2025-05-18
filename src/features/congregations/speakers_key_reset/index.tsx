import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { LockReset } from '@mui/icons-material';
import { SpeakersKeyResetProps } from './index.types';
import useSpeakersKeyReset from './useSpeakersKeyReset';

const SpeakersKeyReset = (props: SpeakersKeyResetProps) => {
  const { handleClose, handleConfirm, handleOpen, open } =
    useSpeakersKeyReset(props);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-congregation-title"
        aria-describedby="delete-congregation-description"
      >
        <DialogTitle id="delete-congregation-title">
          Reset speakers key confirm
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-congregation-description">
            Are you sure you want to reset the speakers key for this
            congregation? This will revoke the access of all current approved
            congregations.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Stop
          </Button>
          <Button onClick={handleConfirm} autoFocus>
            Reset
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        color="warning"
        onClick={handleOpen}
        startIcon={<LockReset />}
      >
        Reset speakers key
      </Button>
    </>
  );
};

export default SpeakersKeyReset;
