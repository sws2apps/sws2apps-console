import {
  Autocomplete,
  CircularProgress,
  Grid2 as Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FlagCongregationsProps } from './index.type';
import useFlagCongregations from './useFlagCongregations';
import FlagUser from './item';

const FlagCongregations = (props: FlagCongregationsProps) => {
  const { flag } = props;

  const {
    handleClose,
    handleOpen,
    loading,
    open,
    options,
    inputValue,
    setInputValue,
    congregation,
    handleCongregationAdd,
  } = useFlagCongregations(props);

  return (
    <Stack spacing="24px">
      <Typography variant="button" fontWeight="bold">
        CONGREGATIONS
      </Typography>

      <Autocomplete
        size="small"
        sx={{ width: 350 }}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => {
          let name = `(${option.country_code}) `;
          name += option.cong_name;

          return name;
        }}
        options={options}
        loading={loading}
        value={congregation}
        onChange={(_, value) => handleCongregationAdd(value)}
        inputValue={inputValue}
        onInputChange={(_, value) => setInputValue(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add new congregation"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
      />

      {flag.congregations.length > 0 && (
        <Grid container spacing={1}>
          {flag.congregations.map((cong) => (
            <FlagUser key={cong.id} cong={cong} flag={flag.id} />
          ))}
        </Grid>
      )}
    </Stack>
  );
};

export default FlagCongregations;
