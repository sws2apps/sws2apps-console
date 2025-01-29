import { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import {
  apiCongregationDelete,
  apiCongregationPersonsGet,
} from '@services/api/congregations';
import {
  congregationBusyState,
  congregationsState,
} from '@states/congregations';
import { showNotification } from '@services/app/notification';
import {
  apiUserDelete,
  apiUserDisableMFA,
  apiUserUpdate,
} from '@services/api/users';
import { APIUser } from '@definition/api';

const useCongregationItem = (id: string) => {
  const [expanded, setExpanded] = useState(false);

  const { data: congUsers, isLoading } = useQuery({
    queryFn: () => apiCongregationPersonsGet(id),
    queryKey: ['congregations', id],
    enabled: expanded,
    refetchOnMount: 'always',
  });

  const setCongregations = useSetAtom(congregationsState);

  const [isProcessing, setIsProcessing] = useAtom(congregationBusyState);

  const [persons, setPersons] = useState<APIUser[]>([]);

  const handleDeleteCongregation = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const congregations = await apiCongregationDelete(id);
      setCongregations(congregations);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      await apiUserDelete(userId);

      const persons = await apiCongregationPersonsGet(id);
      setPersons(persons);

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

      await apiUserDisableMFA(userId);

      const persons = await apiCongregationPersonsGet(id);
      setPersons(persons);

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

      const remote = persons.find((record) => record.id === userId)!;

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

      await apiUserUpdate({ id: userId, email, firstname, lastname });

      const personsNew = await apiCongregationPersonsGet(id);
      setPersons(personsNew);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  useEffect(() => {
    setPersons([]);

    if (congUsers && Array.isArray(congUsers)) {
      setPersons(
        congUsers.sort((a, b) =>
          a.profile.lastname.value.localeCompare(b.profile.lastname.value)
        )
      );
    }
  }, [congUsers, setPersons]);

  return {
    expanded,
    setExpanded,
    isLoading,
    persons,
    handleDeleteCongregation,
    handleDeleteUser,
    handleDisableMFA,
    handleUpdateUserBasic,
    isProcessing,
  };
};

export default useCongregationItem;
