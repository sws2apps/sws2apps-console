import { Chip, Grid, Paper, Typography } from '@mui/material';
import { CongregationAccessRequestProps } from './index.types';
import AccessRequestDelete from '../access_request_delete';

const CongregationAccessRequest = ({
  request,
  onRequestDelete,
}: CongregationAccessRequestProps) => {
  return (
    <Paper elevation={2} sx={{ padding: '5px 10px', flexGrow: 1 }}>
      <Grid container spacing={1} alignItems="center">
        <Grid size={8}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
            ({request.cong_country}) {request.cong_name}, {request.cong_number}
          </Typography>
        </Grid>
        <Grid size={3}>
          <Chip
            size="small"
            label={request.request_status}
            color={
              request.request_status === 'approved'
                ? 'success'
                : request.request_status === 'disapproved'
                ? 'error'
                : 'warning'
            }
            variant="outlined"
          />
        </Grid>
        <Grid size={1} sx={{ textAlign: 'right' }}>
          <AccessRequestDelete request={request} onDelete={onRequestDelete} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CongregationAccessRequest;
