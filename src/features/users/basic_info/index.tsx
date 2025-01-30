import { Grid2 as Grid, TextField } from '@mui/material';
import { BasicInfoProps } from './index.types';
import useBasicInfo from './useBasicInfo';

const BasicInfo = ({
  person,
  emailRef,
  firstnameRef,
  lastnameRef,
}: BasicInfoProps) => {
  const {
    email,
    firstname,
    handleEmailChange,
    handleFirstnameChange,
    handleLastnameChange,
    lastname,
  } = useBasicInfo(person);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 12, lg: 5 }}>
        <TextField
          fullWidth
          label="Last name"
          size="small"
          inputRef={lastnameRef}
          value={lastname}
          onChange={(e) => handleLastnameChange(e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 3.5 }}>
        <TextField
          fullWidth
          label="First name"
          size="small"
          inputRef={firstnameRef}
          value={firstname}
          onChange={(e) => handleFirstnameChange(e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 3.5 }}>
        <TextField
          fullWidth
          label="Email"
          size="small"
          inputRef={emailRef}
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default BasicInfo;
