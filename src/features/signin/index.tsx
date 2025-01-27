import { Box, Button, CircularProgress, Typography } from '@mui/material';
import useSignin from './useSignin';

const Signin = () => {
  const { handleSignin, isProcessing } = useSignin();

  return (
    <>
      <Typography variant="h6" textAlign="center">
        Welcome to the sws2pps console
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <Typography textAlign="center">Please sign in to continue</Typography>

        <Button
          variant="contained"
          onClick={handleSignin}
          endIcon={
            isProcessing && <CircularProgress size={18} color="inherit" />
          }
        >
          Sign in
        </Button>
      </Box>
    </>
  );
};

export default Signin;
