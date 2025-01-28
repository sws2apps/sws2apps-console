import { Box, Typography } from '@mui/material';
import { Circle } from '@mui/icons-material';
import { MFAStatusProps } from './index.types';

const MFAStatus = ({ mfa_enabled, role }: MFAStatusProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {role === 'vip' && (
        <>
          <Circle color={mfa_enabled ? 'success' : 'warning'} />
          <Typography>
            MFA status:{' '}
            {mfa_enabled ? (
              <Typography component="span" variant="button" color="success">
                ENABLED
              </Typography>
            ) : (
              <Typography component="span" variant="button" color="warning">
                DISABLED
              </Typography>
            )}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default MFAStatus;
