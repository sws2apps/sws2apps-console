import { RefObject } from 'react';
import { APICongregationPerson } from '@definition/api';

export type BasicInfoProps = {
  person: APICongregationPerson;
  firstnameRef: RefObject<HTMLInputElement>;
  lastnameRef: RefObject<HTMLInputElement>;
  emailRef: RefObject<HTMLInputElement>;
};
