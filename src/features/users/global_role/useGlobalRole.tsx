import { useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  apiUserDelete,
  apiUserDisableMFA,
  apiUserUpdate,
} from '@services/api/users';
import { userBusyState, usersFilteredState, usersState } from '@states/users';
import { showNotification } from '@services/app/notification';

const useGlobalRole = () => {
  const [isProcessing, setIsProcessing] = useAtom(userBusyState);

  const setUsers = useSetAtom(usersState);

  const users = useAtomValue(usersFilteredState);

  const [expanded, setExpanded] = useState(false);

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

  return {
    expanded,
    setExpanded,
    handleDeleteUser,
    handleDisableMFA,
    handleUpdateUserBasic,
  };
};

export default useGlobalRole;
