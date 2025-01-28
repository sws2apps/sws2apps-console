import { Box, CircularProgress, Typography } from '@mui/material';
import useCongregationsList from './useList';
import CongregationCountry from '../country';

const CongregationsList = () => {
  const { countriesList, isLoading, count } = useCongregationsList();

  return (
    <Box>
      {isLoading && <CircularProgress />}

      {!isLoading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography>Showing {count} results</Typography>

          <Box>
            {countriesList.map((country) => (
              <CongregationCountry
                key={country.country_code}
                country={country}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CongregationsList;
