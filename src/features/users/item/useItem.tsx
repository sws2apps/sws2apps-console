import { useMemo, useRef } from 'react';
import { UserItemProps } from './index.type';

const useUserItem = ({ person, onUpdate }: UserItemProps) => {
  const firstnameRef = useRef<HTMLInputElement | null>(null);
  const lastnameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

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

  return {
    fullname,
    last_seen,
    firstnameRef,
    lastnameRef,
    emailRef,
    handleUpdate,
  };
};

export default useUserItem;
