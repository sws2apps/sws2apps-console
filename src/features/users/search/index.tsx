import useUserSearch from './useSearch';
import SearchBar from '@components/search_bar';

const UserSearch = () => {
  const { handleValueChange, value } = useUserSearch();

  return (
    <SearchBar
      placeholder="Search an user"
      value={value}
      onSearch={handleValueChange}
    />
  );
};

export default UserSearch;
