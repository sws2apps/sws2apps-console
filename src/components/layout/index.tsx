import { Suspense } from 'react';
import { Outlet } from 'react-router';
import {
  Box,
  CircularProgress,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import useLayout from './useLayout';

const drawerWidth = 240;

const Layout = () => {
  const { menus, handleOpenLink } = useLayout();

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />

        {menus.map((menu) => (
          <ListItem key={menu.path} disablePadding>
            <ListItemButton onClick={() => handleOpenLink(menu.path)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </Drawer>

      <Box sx={{ width: '100%' }}>
        <Toolbar />
        <Box
          sx={{
            padding: '8px 24px 24px 12px',
            overflow: 'auto',
          }}
        >
          <Suspense fallback={<CircularProgress />}>
          <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
