import { useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  apiUserDelete,
  apiUserDeleteSession,
  apiUserDeleteSessions,
  apiUserDisableMFA,
  apiUserUpdate,
} from '@services/api/users';
import { userBusyState, usersFilteredState, usersState } from '@states/users';
import { showNotification } from '@services/app/notification';
import { CongRole } from '@definition/congregation';

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
    roles,
  }: {
    userId: string;
    lastname: string;
    firstname: string;
    email: string;
    roles: CongRole[];
  }) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const remote = users.find((record) => record.id === userId)!;

      const remoteLastname = remote.profile.lastname.value;
      const remoteFirstname = remote.profile.firstname.value;
      const remoteEmail = remote.profile?.email || '';
      const remoteRoles = remote.profile.congregation?.cong_role || [];

      const roleUpdate =
        roles.length === remoteRoles.length &&
        roles.every((record) => remoteRoles.some((role) => role === record));

      if (
        remoteLastname === lastname &&
        remoteFirstname === firstname &&
        remoteEmail === email &&
        roleUpdate
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
        roles,
      });

      setUsers(data);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  const handleTerminateAllSessions = async (userId: string) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const users = await apiUserDeleteSessions(userId);
      setUsers(users);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  const handleTerminateSession = async (userId: string, identifier: string) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const users = await apiUserDeleteSession(userId, identifier);
      setUsers(users);

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
    handleTerminateSession,
    handleTerminateAllSessions,
  };
};

export default useGlobalRole;
