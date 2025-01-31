import useCongregationSearch from './useCongregationSearch';
import SearchBar from '@components/search_bar';

const CongregationSearch = () => {
  const { handleValueChange, value } = useCongregationSearch();

  return (
    <SearchBar
      placeholder="Search a congregation"
      value={value}
      onSearch={handleValueChange}
    />
  );
};

export default CongregationSearch;
