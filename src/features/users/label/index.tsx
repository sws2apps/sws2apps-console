import { Box, Chip, Typography } from '@mui/material';
import {
  AccountCircle,
  AdminPanelSettings,
  StarsRounded,
} from '@mui/icons-material';
import { LabelProps } from './index.types';
import IconCongregation from '@icons/IconCongregation';

const Label = ({ role, fullname, congregation }: LabelProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {role === 'vip' && <AdminPanelSettings color="primary" />}
      {role === 'pocket' && <AccountCircle color="secondary" />}
      {role === 'admin' && <StarsRounded color="error" />}

      <Typography>{fullname}</Typography>

      {congregation && (
        <Chip label={congregation} size="small" icon={<IconCongregation />} />
      )}
    </Box>
  );
};

export default Label;
