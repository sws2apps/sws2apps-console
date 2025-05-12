import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import { CongregationAddProps } from './index.types';
import useCongregationAdd from './useCongregationAdd';

const CongregationAdd = (props: CongregationAddProps) => {
  const {
    congregation,
    handleClose,
    handleOpen,
    inputValue,
    loading,
    open,
    options,
    setInputValue,
    handleBindUser,
    isProcessing,
  } = useCongregationAdd(props);

  return (
    <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Autocomplete
        readOnly={isProcessing}
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
        loading={loading || isProcessing}
        value={congregation}
        onChange={(_, value) => handleBindUser(value)}
        inputValue={inputValue}
        onInputChange={(_, value) => setInputValue(value)}
        clearIcon={null}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Find congregation"
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
    </Box>
  );
};

export default CongregationAdd;
