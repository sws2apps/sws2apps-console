import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';
import useNavBar from './useNavBar';
import Layout from '@components/layout';
import MFAVerify from '@features/mfa_verify';
import Signin from '@features/signin';

const NavBar = () => {
  const { isUserConnected, isVerifyMFA, handleSignOut } = useNavBar();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          variant="dense"
          sx={{
            paddingLeft: '0 !important',
            paddingRight: '12px !important',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src="./img/logo_square.svg"
              style={{ height: '48px', width: 'auto' }}
            />
            <Typography variant="button">sws2apps Console</Typography>
          </Box>

          <Button
            variant="text"
            color="inherit"
            startIcon={<Logout />}
            onClick={handleSignOut}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {!isUserConnected && (
        <>
          <Toolbar />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              padding: '24px',
              gap: '24px',
            }}
          >
            {!isVerifyMFA && <Signin />}

            {isVerifyMFA && <MFAVerify />}
          </Box>
        </>
      )}

      {isUserConnected && <Layout />}
    </>
  );
};

export default NavBar;
