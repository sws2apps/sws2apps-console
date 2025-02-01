import SearchBar from '@components/search_bar';
import useSearch from './useSearch';

const FeatureFlagSearch = () => {
  const { handleValueChange, value } = useSearch();

  return (
    <SearchBar
      placeholder="Search a flag"
      value={value}
      onSearch={handleValueChange}
      sx={{ flex: 1 }}
    />
  );
};

export default FeatureFlagSearch;
