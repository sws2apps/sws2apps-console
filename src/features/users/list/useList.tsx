import { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import {
  apiUserDelete,
  apiUserDisableMFA,
  apiUserUpdate,
  apiUsersGet,
} from '@services/api/users';
import {
  userBusyState,
  usersCount,
  usersFilteredState,
  usersState,
} from '@states/users';
import { showNotification } from '@services/app/notification';

const useUsersList = () => {
  const { data: usersResult, isLoading } = useQuery({
    queryFn: apiUsersGet,
    queryKey: ['users'],
  });

  const [isProcessing, setIsProcessing] = useAtom(userBusyState);

  const setUsers = useSetAtom(usersState);

  const count = useAtomValue(usersCount);
  const users = useAtomValue(usersFilteredState);

  const handleDeleteUser = async (userId: string) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const users = await apiUserDelete(userId);
      setUsers(users);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  const handleDisableMFA = async (userId: string) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const users = await apiUserDisableMFA(userId);
      setUsers(users);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  const handleUpdateUserBasic = async ({
    email,
    firstname,
    lastname,
    userId,
  }: {
    userId: string;
    lastname: string;
    firstname: string;
    email: string;
  }) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const remote = users.find((record) => record.id === userId)!;

      const remoteLastname = remote.profile.lastname.value;
      const remoteFirstname = remote.profile.firstname.value;
      const remoteEmail = remote.profile?.email || '';

      if (
        remoteLastname === lastname &&
        remoteFirstname === firstname &&
        remoteEmail === email
      ) {
        showNotification('Nothing to update', 'info');

        setIsProcessing(false);
        return;
      }

      const data = await apiUserUpdate({
        id: userId,
        email,
        firstname,
        lastname,
      });
      setUsers(data);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  useEffect(() => {
    if (usersResult && Array.isArray(usersResult)) {
      setUsers(usersResult);
    }
  }, [usersResult, setUsers]);

  return {
    isLoading,
    users,
    count,
    handleDeleteUser,
    handleDisableMFA,
    handleUpdateUserBasic,
  };
};

export default useUsersList;
