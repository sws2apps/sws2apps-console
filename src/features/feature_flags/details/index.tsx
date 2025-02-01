import {
  Box,
  Divider,
  Grid2 as Grid,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FeatureFlagDetailsProps } from './index.type';
import useFeatureFlagDetails from './useDetails';
import FeatureFlagDelete from '../delete';
import FeatureFlagUpdate from '../update';

const FeatureFlagDetails = (props: FeatureFlagDetailsProps) => {
  const {
    desc,
    handleDescChange,
    handleNameChange,
    name,
    handleFlagDelete,
    handleFlagUpdate,
    coverage,
    handleCoverageChange,
  } = useFeatureFlagDetails(props);

  return (
    <Stack spacing="12px">
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Name"
            size="small"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            fullWidth
            label="Description"
            size="small"
            value={desc}
            onChange={(e) => handleDescChange(e.target.value)}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          gap: '24px',
          marginTop: '40px !important',
          padding: '0px 12px',
        }}
      >
        <Typography fontWeight="bold">Coverage</Typography>

        <Slider
          aria-label="Coverage"
          valueLabelDisplay="on"
          shiftStep={30}
          step={5}
          marks={[
            { value: 0, label: '0%' },
            { value: 100, label: '100%' },
          ]}
          min={0}
          max={100}
          value={coverage}
          onChange={(_, value) => handleCoverageChange(value as number)}
        />
      </Box>

      <Divider />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FeatureFlagUpdate onConfirm={handleFlagUpdate} />

        <FeatureFlagDelete onConfirm={handleFlagDelete} />
      </Box>
    </Stack>
  );
};

export default FeatureFlagDetails;
