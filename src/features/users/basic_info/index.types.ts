import { RefObject } from 'react';
import { APIUser } from '@definition/api';

export type BasicInfoProps = {
  person: APIUser;
  firstnameRef: RefObject<HTMLInputElement | null>;
  lastnameRef: RefObject<HTMLInputElement | null>;
  emailRef: RefObject<HTMLInputElement | null>;
};
