import { Grid, Paper, Switch, Typography } from '@mui/material';
import { FlagUserProps } from './index.type';
import useFlagUser from './useItem';

const FlagUser = (props: FlagUserProps) => {
  const { user } = props;

  const { checked, handleUserDelete } = useFlagUser(props);

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Paper
        sx={{
          padding: '12px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography>{user.name}</Typography>

        <Switch
          checked={checked}
          onChange={(_, checked) => handleUserDelete(checked)}
        />
      </Paper>
    </Grid>
  );
};

export default FlagUser;
