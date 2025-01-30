import { CongRole } from '@definition/congregation';

export type CongRolesProps = {
  roles: CongRole[];
  onChange: (role: CongRole, checked: boolean) => void;
};
