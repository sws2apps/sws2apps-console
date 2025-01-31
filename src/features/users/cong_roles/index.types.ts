import { CongRole } from '@definition/congregation';
import { GlobalRole } from '@definition/user';

export type CongRolesProps = {
  global_role: GlobalRole;
  roles: CongRole[];
  onChange: (role: CongRole, checked: boolean) => void;
};
