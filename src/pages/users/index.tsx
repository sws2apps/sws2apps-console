import { Stack } from '@mui/material';
import UserSearch from '@features/users/search';
import UsersList from '@features/users/list';

const Users = () => {
  return (
    <Stack spacing="24px">
      <UserSearch />
      <UsersList />
    </Stack>
  );
};

export default Users;
