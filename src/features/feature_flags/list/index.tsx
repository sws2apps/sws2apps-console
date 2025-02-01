import { Box, CircularProgress, Typography } from '@mui/material';
import useList from './useList';
import FeatureFlagItem from '../item';

const FeatureFlagsList = () => {
  const { flags, isLoading, count } = useList();

  return (
    <Box>
      {isLoading && <CircularProgress />}

      {!isLoading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography>FEATURE FLAGS: {count}</Typography>

          <Box>
            {flags.map((flag) => (
              <FeatureFlagItem key={flag.id} flag={flag} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FeatureFlagsList;
