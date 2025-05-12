import {
  Autocomplete,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FlagUsersProps } from './index.type';
import useFlagUsers from './useFlagUsers';
import FlagUser from './item';

const FlagUsers = (props: FlagUsersProps) => {
  const { flag } = props;

  const {
    handleClose,
    handleOpen,
    loading,
    open,
    options,
    handleUserAdd,
    user,
    inputValue,
    setInputValue,
  } = useFlagUsers(props);

  return (
    <Stack spacing="24px">
      <Typography variant="button" fontWeight="bold">
        USERS
      </Typography>

      <Autocomplete
        size="small"
        sx={{ width: 350 }}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => {
          let name = option.profile.lastname.value;
          name += name.length > 0 ? ' ' : '';
          name += option.profile.firstname.value;

          return name;
        }}
        options={options}
        loading={loading}
        value={user}
        onChange={(_, value) => handleUserAdd(value)}
        inputValue={inputValue}
        onInputChange={(_, value) => setInputValue(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add new user"
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

      {flag.users.length > 0 && (
        <Grid container spacing={1}>
          {flag.users.map((user) => (
            <FlagUser key={user.id} user={user} flag={flag.id} />
          ))}
        </Grid>
      )}
    </Stack>
  );
};

export default FlagUsers;
