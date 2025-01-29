import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { apiUsersGet } from '@services/api/users';
import { usersCount, usersFilteredState, usersState } from '@states/users';

const useUsersList = () => {
  const { data: usersResult, isLoading } = useQuery({
    queryFn: apiUsersGet,
    queryKey: ['users'],
  });

  const setUsers = useSetAtom(usersState);

  const count = useAtomValue(usersCount);
  const users = useAtomValue(usersFilteredState);

  useEffect(() => {
    if (usersResult && Array.isArray(usersResult)) {
      setUsers(usersResult);
    }
  }, [usersResult, setUsers]);

  return { isLoading, users, count };
};

export default useUsersList;
