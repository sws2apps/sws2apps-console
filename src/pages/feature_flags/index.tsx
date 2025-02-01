import { Box, Stack } from '@mui/material';
import FeatureFlagCreate from '@features/feature_flags/create';
import FeatureFlagSearch from '@features/feature_flags/search';
import FeatureFlagsList from '@features/feature_flags/list';

const FeatureFlags = () => {
  return (
    <Stack spacing="24px">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '8px',
        }}
      >
        <FeatureFlagSearch />
        <FeatureFlagCreate />
      </Box>

      <FeatureFlagsList />
    </Stack>
  );
};

export default FeatureFlags;
