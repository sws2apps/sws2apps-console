import { RefObject } from 'react';
import { APICongregationPerson } from '@definition/api';

export type BasicInfoProps = {
  person: APICongregationPerson;
  firstnameRef: RefObject<HTMLInputElement | null>;
  lastnameRef: RefObject<HTMLInputElement | null>;
  emailRef: RefObject<HTMLInputElement | null>;
};
