import { Box, CircularProgress, Typography } from '@mui/material';
import useUsersList from './useList';
import GlobalRole from '../global_role';

const UsersList = () => {
  const { isLoading, count, usersByRole } = useUsersList();

  return (
    <Box>
      {isLoading && <CircularProgress />}

      {!isLoading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography>USERS: {count}</Typography>

          <Box>
            {usersByRole.map((group) => (
              <GlobalRole key={group.global_role} group={group} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UsersList;
