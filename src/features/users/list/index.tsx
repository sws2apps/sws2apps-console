import { Box, CircularProgress, Typography } from '@mui/material';
import useUsersList from './useList';
import UserItem from '../item';

const UsersList = () => {
  const {
    isLoading,
    count,
    users,
    handleDeleteUser,
    handleDisableMFA,
    handleUpdateUserBasic,
  } = useUsersList();

  return (
    <Box>
      {isLoading && <CircularProgress />}

      {!isLoading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography>USERS: {count}</Typography>

          <Box>
            {users.map((person) => (
              <UserItem
                key={person.id}
                person={person}
                onDisableMFA={() => handleDisableMFA(person.id)}
                onDelete={() => handleDeleteUser(person.id)}
                onUpdate={(lastname, firstname, email) =>
                  handleUpdateUserBasic({
                    userId: person.id,
                    email,
                    firstname,
                    lastname,
                  })
                }
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UsersList;
