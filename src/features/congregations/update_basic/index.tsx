import { Save } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { UpdateBasicProps } from './index.types';
import useUpdateBasic from './useUpdateBasic';

const UpdateBasic = (props: UpdateBasicProps) => {
  const {
    name,
    number,
    hasChanged,
    handleNameChange,
    handleNumberChange,
    handleClose,
    handleOpen,
    handleUpdateBasic,
    open,
  } = useUpdateBasic(props);

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing="16px"
      sx={{ maxWidth: '800px' }}
    >
      <TextField
        label="Name"
        size="small"
        fullWidth
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        label="Number"
        size="small"
        value={number}
        onChange={handleNumberChange}
        sx={{ width: '250px' }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-congregation-title"
        aria-describedby="delete-congregation-description"
      >
        <DialogTitle id="delete-congregation-title">
          Update congregation confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-congregation-description">
            Are you sure you want to update the congregation information? If
            changing the congregation number, please note that this will logout
            all users from the congregation and delete their local data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" autoFocus>
            Stop
          </Button>
          <Button onClick={handleUpdateBasic} color="warning">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        disabled={!hasChanged}
        variant="contained"
        color="warning"
        onClick={handleOpen}
        sx={{ width: '180px' }}
        startIcon={<Save />}
      >
        UPDATE
      </Button>
    </Stack>
  );
};

export default UpdateBasic;
