import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { IconCongregation } from '@icons/index';
import { RemoveCongregationProps } from './index.types';
import useRemoveCongregation from './useRemoveCongregation';
import ButtonGrid from '../button_grid';

const RemoveCongregation = (props: RemoveCongregationProps) => {
  const { handleClose, handleConfirm, handleOpen, open } =
    useRemoveCongregation(props);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-congregation-title"
        aria-describedby="delete-congregation-description"
      >
        <DialogTitle id="delete-congregation-title">
          Remove congregation confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-congregation-description">
            Are you sure you want to remove this user’s congregation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Stop
          </Button>
          <Button onClick={handleConfirm} autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
      <ButtonGrid
        color="secondary"
        onClick={handleOpen}
        startIcon={<IconCongregation color="white" />}
      >
        Remove congregation
      </ButtonGrid>
    </>
  );
};

export default RemoveCongregation;
