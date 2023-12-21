import * as React from "react";
import { Box, FormGroup, Stack } from "@mui/material";
import InputWithLabel from "../form/InputWithLabel";
import { BasicButton } from "../button/Button";
import useCreateAccountStore from "../../hooks/zustand/CreateAccountStore";
import SelectCountry from "../SelectCountry";
import { CountryType } from "../../helpers/Countries";
import BasicLabel from "../form/BasicLabel";

interface AddressFormProps {
  submitButton: {
    content: string;
    onClick: () => void;
  };
}

export const AddressForm = ({ submitButton }: AddressFormProps) => {
  const { address, setAddress } = useCreateAccountStore((state) => ({
    address: state.account.address,
    setAddress: state.setAddress,
  }));

  const handleChange = (value: string | CountryType, property: "address" | "zip" | "city" | "country") => {
    setAddress({
      ...address,
      [property]: value,
    });
  };

  const isSubmitBtnDisabled =
    !address.address.length ||
    !address.zip.length ||
    !address.city.length ||
    !address.country.code?.length ||
    !address.country.label?.length;

  return (
    <Stack
      spacing={{ xs: 2, md: 4 }}
      direction="column"
      useFlexGap
      flexWrap="wrap"
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <InputWithLabel
        label={"address Address"}
        placeholder="75 rue du Javelot"
        value={address.address}
        onChange={(e) => handleChange(e.target.value, "address")}
      />

      <InputWithLabel
        label={"Zip Code"}
        placeholder="75013"
        value={address.zip}
        onChange={(e) => handleChange(e.target.value, "zip")}
      />

      <InputWithLabel
        label={"City"}
        placeholder="Paris"
        value={address.city}
        onChange={(e) => handleChange(e.target.value, "city")}
      />

      <FormGroup
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <BasicLabel content="Country" />
        <SelectCountry value={address.country} onChange={(value) => handleChange(value, "country")} />
      </FormGroup>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          my: 2,
        }}
      >
        <BasicButton disabled={isSubmitBtnDisabled} onClick={submitButton.onClick}>
          {submitButton.content}
        </BasicButton>
      </Box>
    </Stack>
  );
};

export default AddressForm;
