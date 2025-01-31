import { Box, Stack } from '@mui/material';
import CongregationCreate from '@features/congregations/create';
import CongregationsList from '@features/congregations/list';
import CongregationSearch from '@features/congregations/search';

const Congregations = () => {
  return (
    <Stack spacing="24px">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '8px',
        }}
      >
        <CongregationSearch />
        <CongregationCreate />
      </Box>
      <CongregationsList />
    </Stack>
  );
};

export default Congregations;
