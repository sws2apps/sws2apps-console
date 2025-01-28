import { useEffect, useState } from 'react';
import { APICongregationPerson } from '@definition/api';

const useBasicInfo = (person: APICongregationPerson) => {
  const [firstname, setFirstname] = useState(person.profile.firstname.value);
  const [lastname, setLastname] = useState(person.profile.lastname.value);
  const [email, setEmail] = useState(person.profile.email || '');

  const handleFirstnameChange = (value: string) => setFirstname(value);

  const handleLastnameChange = (value: string) => setLastname(value);

  const handleEmailChange = (value: string) => setEmail(value);

  useEffect(() => {
    setFirstname(person.profile.firstname.value);
    setLastname(person.profile.lastname.value);
    setEmail(person.profile.email || '');
  }, [person]);

  return {
    firstname,
    lastname,
    email,
    handleFirstnameChange,
    handleLastnameChange,
    handleEmailChange,
  };
};

export default useBasicInfo;
