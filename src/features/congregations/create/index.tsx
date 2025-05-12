import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import useCongregationCreate from './useCreate';

const CongregationCreate = () => {
  const {
    handleClose,
    handleOpen,
    open,
    countryRef,
    nameRef,
    numberRef,
    handleCreate,
    isProcessing,
  } = useCongregationCreate();

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        startIcon={<AddCircle />}
      >
        Create
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a congregation</DialogTitle>
        <DialogContent sx={{ width: '450px' }}>
          <DialogContentText sx={{ marginBottom: '24px' }}>
            Manually create a congregation in Organized app. You can add users
            to the congregation later.
          </DialogContentText>

          <Stack spacing="16px">
            <TextField label="Country" size="small" inputRef={countryRef} />
            <TextField
              label="Congregation name"
              size="small"
              inputRef={nameRef}
            />
            <TextField
              label="Number"
              size="small"
              inputRef={numberRef}
              type="number"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            endIcon={isProcessing && <CircularProgress size={20} />}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CongregationCreate;
