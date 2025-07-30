import { useNavigate } from 'react-router';
import { RocketLaunch, Settings } from '@mui/icons-material';
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
    {
      icon: <RocketLaunch />,
      text: 'Feature Flags',
      path: 'feature-flags',
    },
    {
      icon: <Settings />,
      text: 'Settings',
      path: 'settings',
    },
  ];

  const handleOpenLink = (path: string) => {
    navigate(path);
  };

  return { menus, handleOpenLink };
};

export default useLayout;
