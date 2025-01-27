import { Stack } from '@mui/material';
import CongregationsList from '@features/congregations/list';
import CongregationSearch from '@features/congregations/search';

const Congregations = () => {
  return (
    <Stack spacing="24px">
      <CongregationSearch />
      <CongregationsList />
    </Stack>
  );
};

export default Congregations;
