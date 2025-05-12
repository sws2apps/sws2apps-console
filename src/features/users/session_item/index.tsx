import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { SessionItemProps } from './index.types';
import { Close, Computer, PhoneAndroid } from '@mui/icons-material';
import useSessionItem from './useSessionItem';

const SessionItem = (props: SessionItemProps) => {
  const { session } = props;

  const { browser, handleTerminate, last_seen, location } =
    useSessionItem(props);

  return (
    <Grid size={{ xs: 12, lg: 6 }}>
      <Paper
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: '4px',
        }}
      >
        <Box
          sx={{
            padding: '8px',
            borderRadius: '10px',
            backgroundColor: '#f2f5ff',
            display: 'flex',
            boxSizing: 'content-box',
          }}
        >
          {session.device.isMobile && <PhoneAndroid />}
          {!session.device.isMobile && <Computer />}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flexGrow: 1,
          }}
        >
          <Typography variant="body2">{location}</Typography>
          <Typography variant="body2">{browser}</Typography>
          <Typography variant="subtitle2">{last_seen}</Typography>
        </Box>
        <Button
          color={session.isSelf ? 'success' : 'error'}
          startIcon={session.isSelf ? null : <Close />}
          onClick={handleTerminate}
        >
          {session.isSelf ? 'Current' : 'Terminate'}
        </Button>
      </Paper>
    </Grid>
  );
};

export default SessionItem;
