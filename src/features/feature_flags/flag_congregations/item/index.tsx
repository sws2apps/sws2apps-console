import { Grid, Paper, Switch, Typography } from '@mui/material';
import { FlagCongregationProps } from './index.type';
import useFlagCongregation from './useItem';

const FlagCongregation = (props: FlagCongregationProps) => {
  const { cong } = props;

  const { checked, handleCongregationDelete } = useFlagCongregation(props);

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
        <Typography>{cong.name}</Typography>

        <Switch
          checked={checked}
          onChange={(_, checked) => handleCongregationDelete(checked)}
        />
      </Paper>
    </Grid>
  );
};

export default FlagCongregation;
