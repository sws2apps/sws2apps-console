import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import { CongRolesProps } from './index.types';

const CongRoles = ({ roles }: CongRolesProps) => {
  return (
    <Stack spacing="12px">
      <Grid container spacing={{ xs: 1, md: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={roles.includes('admin')} />}
              label="Administrator"
            />
            <FormControlLabel
              control={<Checkbox checked={roles.includes('coordinator')} />}
              label="Coordinator"
            />
            <FormControlLabel
              control={<Checkbox checked={roles.includes('secretary')} />}
              label="Secretary"
            />
            <FormControlLabel
              control={
                <Checkbox checked={roles.includes('service_overseer')} />
              }
              label="Service Overseer"
            />
          </FormGroup>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={roles.includes('midweek_schedule')} />
              }
              label="Midweek meeting scheduling"
            />
            <FormControlLabel
              control={
                <Checkbox checked={roles.includes('weekend_schedule')} />
              }
              label="Weekend meeting schedling"
            />
            <FormControlLabel
              control={
                <Checkbox checked={roles.includes('public_talk_schedule')} />
              }
              label="Public talk scheduling"
            />
            <FormControlLabel
              control={
                <Checkbox checked={roles.includes('attendance_tracking')} />
              }
              label="Attendance record tracking"
            />
          </FormGroup>
        </Grid>
      </Grid>
      <Typography>Read-only roles</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox readOnly={true} checked={roles.includes('elder')} />
          }
          label="Elder"
        />
        <FormControlLabel
          control={<Checkbox readOnly={true} checked={roles.includes('ms')} />}
          label="Ministerial Servant"
        />
        <FormControlLabel
          control={
            <Checkbox readOnly={true} checked={roles.includes('publisher')} />
          }
          label="Publisher"
        />
        <FormControlLabel
          control={
            <Checkbox
              readOnly={true}
              checked={roles.includes('view_schedules')}
            />
          }
          label="View Schedules"
        />
      </FormGroup>
    </Stack>
  );
};

export default CongRoles;
