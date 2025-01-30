import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { ClearAll } from '@mui/icons-material';
import { TerminateSessionsProps } from './index.types';
import useTerminateSessions from './useTerminateSessions';
import ButtonGrid from '../button_grid';

const TerminateSessions = (props: TerminateSessionsProps) => {
  const { handleOpen, handleClose, handleConfirm, open } =
    useTerminateSessions(props);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="revoke-sessions-title"
        aria-describedby="revoke-sessions-description"
      >
        <DialogTitle id="revoke-sessions-title">
          Revoke all user sessions
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="revoke-sessions-description">
            Are you sure you want to revoke all the sessions used by this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Stop
          </Button>
          <Button onClick={handleConfirm} autoFocus>
            Revoke
          </Button>
        </DialogActions>
      </Dialog>
      <ButtonGrid color="warning" onClick={handleOpen} startIcon={<ClearAll />}>
        Revoke sessions
      </ButtonGrid>
    </>
  );
};

export default TerminateSessions;
