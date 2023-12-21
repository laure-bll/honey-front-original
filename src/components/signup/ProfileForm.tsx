import * as React from "react";
import { Box, Stack } from "@mui/material";
import InputWithLabel from "../form/InputWithLabel";
import { BasicButton } from "../button/Button";
import useCreateAccountStore from "../../hooks/zustand/CreateAccountStore";
import DeleteAccount from "../../pages/User/Settings/DeleteAccount";
import { isTokenValid } from "../../Config/Auth";
import axios from "axios";
import { API_URL } from "../../routes/Url";

interface ProfileFormProps {
  displayDeleteAccount?: boolean;
  minWidth?: number;
  allowEmptyPassword?: boolean;
  isLoading?: boolean;
  submitButton: {
    content: string;
    onClick: () => void;
  };
}

export const ProfileForm = ({
  submitButton,
  displayDeleteAccount,
  minWidth = 45,
  allowEmptyPassword = false,
  isLoading = false,
}: ProfileFormProps) => {
  const { profile, setProfile } = useCreateAccountStore((state) => ({
    profile: state.account.profile,
    setProfile: state.setProfile,
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    property: "firstName" | "lastName" | "email" | "password",
  ) => {
    setProfile({
      ...profile,
      [property]: e.target.value,
    });
  };

  const isSubmitBtnDisabled =
    !profile.email.length ||
    !profile.firstName.length ||
    !profile.lastName.length ||
    (!profile.password.length && !allowEmptyPassword) ||
    isLoading;

  const getUser = async () => {
    if (isTokenValid()) {
      const currentUser = await axios({
        method: "get",
        url: API_URL + "/auth",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      const { email, firstName, lastName } = currentUser.data;
      setProfile({ ...profile, email, firstName, lastName });
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <Stack
      spacing={{ xs: 2, md: 4 }}
      direction="column"
      useFlexGap
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
      sx={{ ".MuiOutlinedInput-input": { minWidth: minWidth + "vw" } }}
    >
      <InputWithLabel
        label="First Name"
        type="text"
        placeholder="John"
        value={profile.firstName}
        onChange={(e) => handleChange(e, "firstName")}
      />

      <InputWithLabel
        label="Last Name"
        type="text"
        placeholder="Dubois"
        value={profile.lastName}
        onChange={(e) => handleChange(e, "lastName")}
      />

      <InputWithLabel
        label="Email"
        type="email"
        placeholder="johndubois06@mail.com"
        value={profile.email}
        onChange={(e) => handleChange(e, "email")}
      />

      <InputWithLabel
        label="Password"
        type="password"
        placeholder="********"
        value={profile.password}
        onChange={(e) => handleChange(e, "password")}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: displayDeleteAccount ? "space-between" : "flex-end",
          alignItems: "center",
          width: "100%",
          my: 2,
        }}
      >
        {displayDeleteAccount && <DeleteAccount />}
        <BasicButton disabled={isSubmitBtnDisabled} onClick={submitButton.onClick}>
          {submitButton.content}
        </BasicButton>
      </Box>
    </Stack>
  );
};

export default ProfileForm;
