import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { AccessRequestDeleteProps } from './index.types';
import useSpeakersKeyReset from './useAccessRequestDelete';

const AccessRequestDelete = (props: AccessRequestDeleteProps) => {
  const { request } = props;

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
          Delete access confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-congregation-description">
            Are you sure you want to delete this access request record?
            {request.request_status === 'approved' &&
              ' This will revoke the congregation access to the speakers list as well.'}
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

      <IconButton aria-label="delete" size="small" onClick={handleOpen}>
        <Delete color="error" />
      </IconButton>
    </>
  );
};

export default AccessRequestDelete;
