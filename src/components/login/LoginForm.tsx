import * as React from "react";
import { LockOutlined, PersonOutline } from "@mui/icons-material";
import { Alert, Stack } from "@mui/material";
import InputWithIcon from "../form/InputWithIcon";
import { BasicButton, LoadingButton } from "../button/Button";
import NoAccountLink from "./NoAccountLink";
import axios from "axios";
import { API_URL } from "../../routes/Url";
import { isTokenValid } from "../../Config/Auth";
import useCreateAccountStore from "../../hooks/zustand/CreateAccountStore";

interface LoginApi {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { setProfile } = useCreateAccountStore((state) => state);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const [account, setAccount] = React.useState<LoginApi>({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    property: "email" | "password",
  ) => {
    setAccount((prev) => ({
      ...prev,
      [property]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response: any = await axios({
        method: "post",
        url: API_URL + "/auth/login",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: { ...account },
      });

      localStorage.setItem("token", response.data.userToken.toString());

      if (isTokenValid()) {
        window.location.pathname = "/dashboard";
      } else {
        setIsSubmitting(false);
        setErrorMessage("The authentication failed. Please, try again.");
      }
    } catch (e: any) {
      setIsSubmitting(false);
      setErrorMessage("The authentication failed. Make sure you're using the right credentials.");
    }
  };

  const isSubmitBtnDisabled = !account.email.length || !account.password.length;

  return (
    <Stack
      spacing={{ xs: 2, md: 6 }}
      direction="column"
      useFlexGap
      flexWrap="wrap"
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <InputWithIcon
        StartIcon={PersonOutline}
        type="email"
        placeholder="Enter email"
        value={account.email}
        onChange={(e) => handleChange(e, "email")}
      />

      <InputWithIcon
        StartIcon={LockOutlined}
        type="password"
        placeholder="Password"
        onChange={(e) => handleChange(e, "password")}
      />

      {!!errorMessage && <Alert severity="warning">{errorMessage}</Alert>}

      {isSubmitting ? (
        <LoadingButton />
      ) : (
        <BasicButton disabled={isSubmitting || isSubmitBtnDisabled} onClick={handleSubmit}>
          Login
        </BasicButton>
      )}

      <NoAccountLink />
    </Stack>
  );
};

export default LoginForm