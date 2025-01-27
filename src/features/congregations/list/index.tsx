import { Box, CircularProgress } from '@mui/material';
import useCongregationsList from './useList';
import CongregationCountry from '../country';

const CongregationsList = () => {
  const { countriesList, isLoading } = useCongregationsList();

  return (
    <Box>
      {isLoading && <CircularProgress />}

      {!isLoading &&
        countriesList.map((country) => (
          <CongregationCountry key={country.country_code} country={country} />
        ))}
    </Box>
  );
};

export default CongregationsList;
