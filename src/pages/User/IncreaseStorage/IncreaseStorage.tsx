import { Box, Stack } from "@mui/material";
import * as React from "react";
import Stepper from "./Stepper";
import Card from "../../../components/container/Card";
import OrderSummary from "./OrderSummary";
import { COLORS } from "../../../style/colors";
import HangarFullLayout from "../../../layouts/HangarFullLayout";
import Navbar from "../../../components/Navbar";

const IncreaseStorage = () => (
  <HangarFullLayout
    content={
      <Stack direction="column" justifyContent="space-around" sx={{ padding: "2rem" }}>
        <Navbar />
        <Stack
          sx={{ mt: "60px" }}
          direction={{
            xs: "column-reverse",
            md: "row",
          }}
          alignItems={"center"}
          gap={2}
          justifyContent={"space-around"}
        >
          <Stack
            width={{
              xs: "100%",
              md: "50%",
              lg: "60%",
            }}
          >
            <Box
              component="h1"
              sx={{
                color: COLORS.deepBlue,
                fontSize: "26px",
                fontWeight: 500,
                pb: "2rem",
              }}
            >
              Increase your storage space to keep your data safe.
            </Box>
            <Stepper />
          </Stack>
          <Card content={<OrderSummary />} />
        </Stack>
      </Stack>
    }
  />
);

export default IncreaseStorage;
