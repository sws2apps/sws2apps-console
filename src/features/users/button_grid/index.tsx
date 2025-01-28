import { Button, ButtonProps, Grid2 as Grid } from '@mui/material';

const ButtonGrid = (props: ButtonProps) => {
  return (
    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
      <Button fullWidth variant="contained" {...props} />
    </Grid>
  );
};

export default ButtonGrid;
