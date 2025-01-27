import { TextField } from '@mui/material';
import useCongregationSearch from './useCongregationSearch';

const CongregationSearch = () => {
  const { handleValueChange, value } = useCongregationSearch();

  return (
    <TextField
      label={`Search a congregation`}
      size="small"
      value={value}
      onChange={(e) => handleValueChange(e.target.value)}
    />
  );
};

export default CongregationSearch;
