import { Stack } from '@mui/material';
import ClientVersion from '@features/settings/client_version';

const Settings = () => {
  return (
    <Stack spacing="24px">
      <ClientVersion />
    </Stack>
  );
};

export default Settings;
