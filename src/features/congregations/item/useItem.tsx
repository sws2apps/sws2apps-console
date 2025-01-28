import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import {
  apiCongregationDelete,
  apiCongregationPersonsGet,
  apiCongregationsGet,
} from '@services/api/congregations';
import { congregationsState } from '@states/congregations';
import { showNotification } from '@services/app/notification';
import { apiUserDelete, apiUserDisableMFA } from '@services/api/users';
import { APICongregationPerson } from '@definition/api';

const useCongregationItem = (id: string) => {
  const [expanded, setExpanded] = useState(false);

  const { data: congUsers, isLoading } = useQuery({
    queryFn: () => apiCongregationPersonsGet(id),
    queryKey: ['congregations', id],
    enabled: expanded,
    refetchOnMount: 'always',
  });

  const setCongregations = useSetAtom(congregationsState);

  const [persons, setPersons] = useState<APICongregationPerson[]>([]);

  const handleDeleteCongregation = async () => {
    try {
      await apiCongregationDelete(id);

      const congregations = await apiCongregationsGet();
      setCongregations(congregations);
    } catch (error) {
      console.error(error);

      showNotification((error as Error).message, 'error');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await apiUserDelete(userId);

      const persons = await apiCongregationPersonsGet(id);
      setPersons(persons);
    } catch (error) {
      console.error(error);

      showNotification((error as Error).message, 'error');
    }
  };

  const handleDisableMFA = async (userId: string) => {
    try {
      await apiUserDisableMFA(userId);

      const persons = await apiCongregationPersonsGet(id);
      setPersons(persons);
    } catch (error) {
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
  };
};

export default useCongregationItem;
