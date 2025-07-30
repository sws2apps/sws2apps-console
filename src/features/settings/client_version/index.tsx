import { Save } from '@mui/icons-material';
import { Button, Stack, TextField, Typography } from '@mui/material';
import useClientVersion from './useClientVersion';

const ClientVersion = () => {
  const { handleSave, version, handleChange } = useClientVersion();

  return (
    <Stack spacing="16px">
      <Stack>
        <Typography variant="body1">CLIENT VERSION</Typography>
        <Typography variant="body2">
          Minimum version of Organized client to connect to the API
        </Typography>
      </Stack>

      <Stack direction="row" spacing="4px">
        <TextField
          label="Version"
          size="small"
          value={version}
          onChange={(e) => handleChange(e.target.value)}
          slotProps={{ input: { sx: { width: '140px' } } }}
        />

        <Button
          disabled={version.length === 0}
          variant="contained"
          onClick={handleSave}
          startIcon={<Save />}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
};

export default ClientVersion;
