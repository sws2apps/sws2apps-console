import { useNavigate } from 'react-router';
import { IconAccount, IconCongregation } from '@icons/index';

const useLayout = () => {
  const navigate = useNavigate();

  const menus = [
    {
      icon: <IconAccount />,
      text: 'Users',
      path: 'users',
    },
    {
      icon: <IconCongregation />,
      text: 'Congregations',
      path: 'congregations',
    },
  ];

  const handleOpenLink = (path: string) => {
    navigate(path);
  };

  return { menus, handleOpenLink };
};

export default useLayout;
