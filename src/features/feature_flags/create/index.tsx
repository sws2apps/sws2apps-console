import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import useCreate from './useCreate';

const FeatureFlagCreate = () => {
  const {
    handleClose,
    handleOpen,
    open,
    availability,
    handleAvailabilityChange,
    descRef,
    nameRef,
    handleCreateFlag,
  } = useCreate();

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
        <DialogTitle>Create a flag</DialogTitle>
        <DialogContent sx={{ width: '420px' }}>
          <Stack spacing="18px" sx={{ marginTop: '12px' }}>
            <TextField label="Name" size="small" inputRef={nameRef} />

            <TextField label="Description" size="small" inputRef={descRef} />

            <FormControl fullWidth size="small">
              <InputLabel id="flag-type-label">Availability</InputLabel>
              <Select
                labelId="flag-type-label"
                id="flag-type"
                label="Availability"
                value={availability}
                onChange={(e) => handleAvailabilityChange(e.target.value)}
              >
                <MenuItem value="app">App</MenuItem>
                <MenuItem value="congregation">Congregation</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateFlag}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FeatureFlagCreate;
