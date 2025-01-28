import { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import {
  apiCongregationDelete,
  apiCongregationPersonsGet,
  apiCongregationsGet,
} from '@services/api/congregations';
import {
  congregationPersonsState,
  congregationsState,
} from '@states/congregations';
import { showNotification } from '@services/app/notification';

const useCongregationItem = (id: string) => {
  const [expanded, setExpanded] = useState(false);

  const { data: congUsers, isLoading } = useQuery({
    queryFn: () => apiCongregationPersonsGet(id),
    queryKey: [`congregation-${id}-users`],
    enabled: expanded,
  });

  const [persons, setPersons] = useAtom(congregationPersonsState);

  const setCongregations = useSetAtom(congregationsState);

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
  };
};

export default useCongregationItem;
