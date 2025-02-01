import { Box, Switch, Typography } from '@mui/material';
import { AppSettingsAlt } from '@mui/icons-material';
import { IconAccount, IconCongregation } from '@icons/index';
import { LabelProps } from './index.types';
import useLabel from './useLabel';

const Label = (props: LabelProps) => {
  const { handleSwitch, checked } = useLabel(props);

  const { flag } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {flag.availability === 'app' && <AppSettingsAlt color="error" />}
        {flag.availability === 'congregation' && (
          <IconCongregation color="blue" />
        )}
        {flag.availability === 'user' && <IconAccount color="green" />}

        <Typography variant="body2" fontWeight="bold">
          {flag.name}
        </Typography>
      </Box>

      <Switch
        onClick={(e) => e.stopPropagation()}
        checked={checked}
        onChange={(_, checked) => handleSwitch(checked)}
      />
    </Box>
  );
};

export default Label;
