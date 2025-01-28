import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { apiCongregationPersonsGet } from '@services/api/congregations';
import { congregationPersonsState } from '@states/congregations';

const useCongregationItem = (id: string) => {
  const [expanded, setExpanded] = useState(false);

  const { data: congUsers, isLoading } = useQuery({
    queryFn: () => apiCongregationPersonsGet(id),
    queryKey: [`congregation-${id}-users`],
    enabled: expanded,
  });

  const [persons, setPersons] = useAtom(congregationPersonsState);

  useEffect(() => {
    if (congUsers && Array.isArray(congUsers)) {
      setPersons(
        congUsers.sort((a, b) =>
          a.profile.lastname.value.localeCompare(b.profile.lastname.value)
        )
      );
    }
  }, [congUsers, setPersons]);

  return { expanded, setExpanded, isLoading, persons };
};

export default useCongregationItem;
