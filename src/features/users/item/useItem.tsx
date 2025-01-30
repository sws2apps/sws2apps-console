import { useEffect, useMemo, useRef, useState } from 'react';
import { UserItemProps } from './index.type';

const useUserItem = ({ person, onUpdate }: UserItemProps) => {
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [roles, setRoles] = useState(
    person.profile.congregation?.cong_role || []
  );

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

  const handleUpdate = () => {
    const firstname = firstnameRef.current?.value || '';
    const lastname = lastnameRef.current?.value || '';
    const email = emailRef.current?.value || '';

    onUpdate(lastname, firstname, email);
  };

  useEffect(() => {
    setRoles(person.profile.congregation?.cong_role || []);
  }, [person]);

  return {
    fullname,
    last_seen,
    firstnameRef,
    lastnameRef,
    emailRef,
    handleUpdate,
    roles,
  };
};

export default useUserItem;
