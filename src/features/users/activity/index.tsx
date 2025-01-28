import { Stack, Typography } from '@mui/material';
import { ActivityProps } from './index.type';

const Activity = ({ createdAt, last_seen }: ActivityProps) => {
  return (
    <Stack spacing="4px">
      <Typography variant="subtitle2" textAlign="right">
        Created at: {new Date(createdAt).toLocaleString()}
      </Typography>

      {last_seen && (
        <Typography variant="subtitle2" textAlign="right">
          Last seen at: {last_seen}
        </Typography>
      )}
    </Stack>
  );
};

export default Activity;
