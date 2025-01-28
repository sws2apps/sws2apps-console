import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { DeleteUserProps } from './index.types';
import useDeleteUser from './useDeleteUser';
import ButtonGrid from '../button_grid';

const DeleteUser = (props: DeleteUserProps) => {
  const { handleClose, handleConfirm, handleOpen, open } = useDeleteUser(props);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-user-title"
        aria-describedby="delete-user-description"
      >
        <DialogTitle id="delete-user-title">
          Delete user confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-user-description">
            Are you sure you want to delete this user?
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
      <ButtonGrid color="error" onClick={handleOpen} startIcon={<Delete />}>
        Delete
      </ButtonGrid>
    </>
  );
};

export default DeleteUser;
