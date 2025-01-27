import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import useMFAVerify from './useMFAVerify';

const MFAVerify = () => {
  const { otpRef, handleVerifyOTP, isProcessing } = useMFAVerify();

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
        <TextField
          label="Enter 2FA code"
          inputRef={otpRef}
          slotProps={{ input: { readOnly: isProcessing } }}
        />
        <Button
          variant="contained"
          onClick={handleVerifyOTP}
          endIcon={
            isProcessing && <CircularProgress size={18} color="inherit" />
          }
        >
          Verify
        </Button>
      </Box>
    </>
  );
};

export default MFAVerify;
