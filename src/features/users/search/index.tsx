import { TextField } from '@mui/material';
import useUserSearch from './useSearch';

const UserSearch = () => {
  const { handleValueChange, value } = useUserSearch();

  return (
    <TextField
      label={`Search an user`}
      size="small"
      value={value}
      onChange={(e) => handleValueChange(e.target.value)}
    />
  );
};

export default UserSearch;
