import * as React from "react";
import { Stack } from "@mui/material";
import { COLORS } from "../../style/colors";
import { Typography } from "@mui/material";
import LoginForm from "../../components/login/LoginForm";
import HomeLayout from "../../layouts/HomeLayout";

const LoginPage = () => {
  return (
    <HomeLayout
      content={
        <Stack
          spacing={{ xs: 6 }}
          direction="column"
          useFlexGap
          flexWrap="wrap"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            component="h2"
            sx={{
              span: {
                fontSize: "40px",
                fontWeight: 600,
              },
            }}
          >
            <Typography component="span" sx={{ color: COLORS.deepBlue }}>
              Welcome
            </Typography>{" "}
            <Typography component="span" sx={{ color: COLORS.yellow }}>
              back
            </Typography>
          </Typography>
          <LoginForm />
        </Stack>
      }
    />
  );
};

export default LoginPage;
