import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import { CongRolesProps } from './index.types';

const CongRoles = ({ roles, onChange, global_role }: CongRolesProps) => {
  return (
    <Stack spacing="12px">
      {global_role === 'vip' && (
        <Grid container spacing={{ xs: 1, md: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormGroup>
              <FormControlLabel
                label="Administrator"
                control={
                  <Checkbox
                    checked={roles.includes('admin')}
                    onChange={(e) => onChange('admin', e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="Coordinator"
                control={
                  <Checkbox
                    checked={roles.includes('coordinator')}
                    onChange={(e) => onChange('coordinator', e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="Secretary"
                control={
                  <Checkbox
                    checked={roles.includes('secretary')}
                    onChange={(e) => onChange('secretary', e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="Service Overseer"
                control={
                  <Checkbox
                    checked={roles.includes('service_overseer')}
                    onChange={(e) => onChange('secretary', e.target.checked)}
                  />
                }
              />
            </FormGroup>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormGroup>
              <FormControlLabel
                label="Midweek Meeting Scheduling"
                control={
                  <Checkbox
                    checked={roles.includes('midweek_schedule')}
                    onChange={(e) =>
                      onChange('midweek_schedule', e.target.checked)
                    }
                  />
                }
              />
              <FormControlLabel
                label="Weekend Meeting Schedling"
                control={
                  <Checkbox
                    checked={roles.includes('weekend_schedule')}
                    onChange={(e) =>
                      onChange('weekend_schedule', e.target.checked)
                    }
                  />
                }
              />
              <FormControlLabel
                label="Public Talk Scheduling"
                control={
                  <Checkbox
                    checked={roles.includes('public_talk_schedule')}
                    onChange={(e) =>
                      onChange('public_talk_schedule', e.target.checked)
                    }
                  />
                }
              />
              <FormControlLabel
                label="Attendance Record Tracking"
                control={
                  <Checkbox
                    checked={roles.includes('attendance_tracking')}
                    onChange={(e) =>
                      onChange('attendance_tracking', e.target.checked)
                    }
                  />
                }
              />
            </FormGroup>
          </Grid>
        </Grid>
      )}

      <Typography variant="button" fontWeight="bold" fontStyle="italic">
        Read-only roles
      </Typography>
      <FormGroup>
        <FormControlLabel
          label="Elder"
          control={
            <Checkbox readOnly={true} checked={roles.includes('elder')} />
          }
        />
        <FormControlLabel
          label="Ministerial Servant"
          control={<Checkbox readOnly={true} checked={roles.includes('ms')} />}
        />
        <FormControlLabel
          label="Publisher"
          control={
            <Checkbox readOnly={true} checked={roles.includes('publisher')} />
          }
        />
        <FormControlLabel
          label="View Schedules"
          control={
            <Checkbox
              readOnly={true}
              checked={roles.includes('view_schedules')}
            />
          }
        />
      </FormGroup>
    </Stack>
  );
};

export default CongRoles;
