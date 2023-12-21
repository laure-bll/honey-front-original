import { Autocomplete, Box, TextField } from "@mui/material";
import * as React from "react";
import Countries, { CountryType } from "../helpers/Countries";
import { CustomStyle } from "../style/components";

interface SelectCountryProps {
  value: CountryType;
  onChange: (country: CountryType) => void;
}

const SelectCountry = ({ value, onChange }: SelectCountryProps) => (
  <Autocomplete
    id="country-select"
    sx={{ width: 356 }}
    options={Countries}
    value={value}
    onChange={(e, value) => !!value && onChange(value)}
    autoHighlight
    getOptionLabel={(option) => option.label}
    renderOption={(props, option) => (
      <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
        <img
          loading="lazy"
          width="20"
          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
          alt=""
        />
        {option.label} ({option.code})
      </Box>
    )}
    renderInput={(params) => (
      <TextField {...params} sx={CustomStyle.BASIC_INPUT} placeholder="France" inputProps={{ ...params.inputProps }} />
    )}
  />
);

export default SelectCountry;
