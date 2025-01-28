import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { UpdateBasicInfoProps } from './index.types';
import useUpdateBasicInfo from './useUpdateBasicInfo';
import ButtonGrid from '../button_grid';

const UpdateBasicInfo = (props: UpdateBasicInfoProps) => {
  const { handleClose, handleConfirm, handleOpen, open } =
    useUpdateBasicInfo(props);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="update-basic-info-title"
        aria-describedby="update-basic-info-description"
      >
        <DialogTitle id="update-basic-info-title">
          User updates confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="update-basic-info-description">
            Are you sure to update the basic information of this user? If
            changing the email, the user will be logged out and local data will
            be deleted.
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
      <ButtonGrid onClick={handleOpen} startIcon={<Save />}>
        Update
      </ButtonGrid>
    </>
  );
};

export default UpdateBasicInfo;
