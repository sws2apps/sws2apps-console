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
import { AddCircle } from '@mui/icons-material';
import useCongregationCreate from './useCreate';

const CongregationCreate = () => {
  const { handleClose, handleOpen, open } = useCongregationCreate();

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
            Manually create a congregation in Organized app
          </DialogContentText>

          <Stack spacing="16px">
            <TextField label="Country" size="small" />
            <TextField label="Congregation name" size="small" />
            <TextField label="Number" size="small" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CongregationCreate;
