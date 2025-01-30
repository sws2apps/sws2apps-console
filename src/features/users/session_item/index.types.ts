import { APIUserSession } from '@definition/api';

export type SessionItemProps = {
  session: APIUserSession;
  onTerminate: (visitorid: string) => void;
};
