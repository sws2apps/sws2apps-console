import { Box, Button, TextField, Typography } from '@mui/material';
import useMFAVerify from './useMFAVerify';

const MFAVerify = () => {
  const { otpRef } = useMFAVerify();

  return (
    <>
      <Typography>Let’s make sure that it is you</Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
        }}
      >
        <TextField label="Enter 2FA code" inputRef={otpRef} />
        <Button variant="contained">Verify</Button>
      </Box>
    </>
  );
};

export default MFAVerify;
