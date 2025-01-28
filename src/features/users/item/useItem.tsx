import { useEffect, useMemo, useState } from 'react';
import { useSetAtom } from 'jotai';
import { APICongregationPerson } from '@definition/api';
import { apiUserDelete, apiUserDisableMFA } from '@services/api/users';
import { congregationsState } from '@states/congregations';
import { apiCongregationsGet } from '@services/api/congregations';
import { showNotification } from '@services/app/notification';

const useUserItem = (person: APICongregationPerson) => {
  const setCongregations = useSetAtom(congregationsState);

  const fullname = useMemo(() => {
    const lastname = person.profile.lastname.value;
    const firstname = person.profile.firstname.value;

    if (lastname === '') return firstname;

    if (firstname === '') return lastname;

    return `${lastname} ${firstname}`;
  }, [person]);

  const last_seen = useMemo(() => {
    const sessions = person.sessions.sort((a, b) =>
      b.last_seen.localeCompare(a.last_seen)
    );
    const recent = sessions.at(0)?.last_seen;

    if (!recent) return;

    return new Date(recent).toLocaleString();
  }, [person]);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  const handleDeleteUser = async () => {
    try {
      await apiUserDelete(person.id);

      const congregations = await apiCongregationsGet();
      setCongregations(congregations);
    } catch (error) {
      console.error(error);

      showNotification((error as Error).message, 'error');
    }
  };

  const handleDisableMFA = async () => {
    try {
      await apiUserDisableMFA(person.id);

      const congregations = await apiCongregationsGet();
      setCongregations(congregations);
    } catch (error) {
      console.error(error);

      showNotification((error as Error).message, 'error');
    }
  };

  useEffect(() => {
    const lastname = person.profile.lastname.value;
    setLastname(lastname);

    const firstname = person.profile.firstname.value;
    setFirstname(firstname);

    const email = person.profile.email || '';
    setEmail(email);
  }, [person]);

  return {
    fullname,
    firstname,
    lastname,
    email,
    last_seen,
    handleDeleteUser,
    handleDisableMFA,
  };
};

export default useUserItem;
