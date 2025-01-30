import { APIUserSession } from '@definition/api';

export type SessionsListProps = {
  sessions: APIUserSession[];
  onTerminate: (identifier: string) => void;
};
