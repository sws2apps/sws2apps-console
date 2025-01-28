import { useEffect, useMemo, useState } from 'react';
import { APICongregationPerson } from '@definition/api';

const useUserItem = (person: APICongregationPerson) => {
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

  useEffect(() => {
    const lastname = person.profile.lastname.value;
    setLastname(lastname);

    const firstname = person.profile.firstname.value;
    setFirstname(firstname);

    const email = person.profile.email || '';
    setEmail(email);
  }, [person]);

  return { fullname, firstname, lastname, email, last_seen };
};

export default useUserItem;
