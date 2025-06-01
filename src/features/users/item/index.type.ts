import { APIUser } from '@definition/api';
import { CongRole } from '@definition/congregation';

export type UserItemProps = {
  person: APIUser;
  onDelete: VoidFunction;
  onDisableMFA: VoidFunction;
  onUpdate: (
    lastname: string,
    firstname: string,
    email: string,
    roles: CongRole[]
  ) => void;
  onTerminateSession: (identifier: string) => void;
  onTerminateSessions: VoidFunction;
  onCongregationRemove: VoidFunction;
};
