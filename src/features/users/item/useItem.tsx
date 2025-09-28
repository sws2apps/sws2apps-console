import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { UserItemProps } from './index.type';
import { CongRole } from '@definition/congregation';

const useUserItem = ({ person, onUpdate }: UserItemProps) => {
  const location = useLocation();

  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [expanded, setExpanded] = useState(false);
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

  const congregation = useMemo(() => {
    if (location.pathname === '/congregations') return;

    const congId = person.profile.congregation?.id;

    if (!congId) return;

    const country = person.profile.congregation!.country_code;
    const name = person.profile.congregation!.cong_name;

    return `${country}-${name}`;
  }, [location, person]);

  const handleUpdateRole = (role: CongRole, checked: boolean) => {
    const findRole = roles.find((record) => record === role);

    if (checked) {
      if (!findRole) {
        setRoles((prev) => {
          const data = structuredClone(prev);
          data.push(role);
          return data;
        });
      }
    }

    if (!checked && findRole) {
      setRoles((prev) => {
        const data = prev.filter((record) => record !== role);
        return data;
      });
    }
  };

  const handleUpdate = () => {
    const firstname = firstnameRef.current?.value || '';
    const lastname = lastnameRef.current?.value || '';
    const email = emailRef.current?.value || '';

    onUpdate(lastname, firstname, email, roles);
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
    expanded,
    setExpanded,
    congregation,
    handleUpdateRole,
  };
};

export default useUserItem;
