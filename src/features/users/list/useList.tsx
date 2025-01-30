import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { apiUsersGet } from '@services/api/users';
import { usersByRoleState, usersCount, usersState } from '@states/users';

const useUsersList = () => {
  const { data: users, isLoading } = useQuery({
    queryFn: apiUsersGet,
    queryKey: ['users'],
  });

  const setUsers = useSetAtom(usersState);

  const count = useAtomValue(usersCount);
  const usersByRole = useAtomValue(usersByRoleState);

  useEffect(() => {
    if (users && Array.isArray(users)) {
      setUsers(users);
    }
  }, [users, setUsers]);

  return {
    isLoading,
    usersByRole,
    count,
  };
};

export default useUsersList;
