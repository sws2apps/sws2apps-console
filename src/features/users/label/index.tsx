import { Box, Typography } from '@mui/material';
import { AccountCircle, AdminPanelSettings } from '@mui/icons-material';
import { LabelProps } from './index.types';

const Label = ({ role, fullname }: LabelProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {role === 'vip' && <AdminPanelSettings color="primary" />}
      {role === 'pocket' && <AccountCircle color="secondary" />}

      <Typography>{fullname}</Typography>
    </Box>
  );
};

export default Label;
