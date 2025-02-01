import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { FeatureFlagUpdateProps } from './index.types';
import useUpdate from './useUpdate';

const FeatureFlagUpdate = (props: FeatureFlagUpdateProps) => {
  const { handleClose, handleConfirm, handleOpen, open } = useUpdate(props);

  return (
    <>
      <Button variant="contained" onClick={handleOpen} startIcon={<Save />}>
        Update
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="update-flag-title"
        aria-describedby="update-flag-description"
      >
        <DialogTitle id="update-flag-title">Update flag details</DialogTitle>
        <DialogContent>
          <DialogContentText id="update-flag-description">
            Are you sure you want to update this flag?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Stop
          </Button>
          <Button onClick={handleConfirm} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FeatureFlagUpdate;
