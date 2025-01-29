import { APIUser } from '@definition/api';

export type UserItemProps = {
  person: APIUser;
  onDelete: VoidFunction;
  onDisableMFA: VoidFunction;
  onUpdate: (lastname: string, firstname: string, email: string) => void;
};
