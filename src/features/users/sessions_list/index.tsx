import { Box, Grid2 as Grid, Stack, Typography } from '@mui/material';
import { SessionsListProps } from './index.types';
import SessionItem from '../session_item';

const SessionsList = ({ sessions, onTerminate }: SessionsListProps) => {
  return (
    <Stack spacing="24px">
      <Typography variant="button" fontWeight="bold">
        SESSIONS
      </Typography>

      <Box>
        <Grid container spacing={{ xs: 1, md: 2 }}>
          {sessions.map((session) => (
            <SessionItem
              key={session.identifier}
              session={session}
              onTerminate={onTerminate}
            />
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};

export default SessionsList;
