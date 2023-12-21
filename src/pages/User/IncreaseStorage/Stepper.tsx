import React from "react";
import {
  Stepper as StepperMui,
  Step,
  StepLabel,
  Box,
  Typography,
  StepConnector,
  stepConnectorClasses,
  styled,
  StepContent,
} from "@mui/material";
import { COLORS } from "../../../style/colors";
import Payment from "../../../components/stripe/Payment";
import BillingAddress from "./BillingAddress";

export const steps = [
  {
    label: "Billing address",
    content: <BillingAddress />,
  },
  {
    label: "Payment details",
    content: <Payment isSigningUp={false} />,
  },
];

const Stepper = () => {
  const Connector = styled(StepConnector)(() => ({
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: COLORS.enabled,
      borderLeftWidth: 2,
      borderRadius: 1,
    },
  }));

  return (
    <StepperMui orientation="vertical" connector={<Connector />}>
      {steps.map((step, index) => (
        <Step key={step.label} active={true}>
          <StepLabel
            sx={{ py: 0 }}
            icon={
              <Box
                sx={{
                  width: "37px",
                  height: "36px",
                  flexShrink: 0,
                  borderRadius: "10px",
                  background: COLORS.enabled,
                  color: "#FFF",
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                  right: "0.4rem",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: 600,
                  }}
                >
                  {index + 1}
                </Typography>
              </Box>
            }
          >
            <Box sx={{ color: COLORS.enabled }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "1.2rem",
                }}
              >
                {step.label}
              </Typography>
            </Box>
          </StepLabel>
          <StepContent
            sx={{
              borderColor: COLORS.enabled,
              borderLeftWidth: 2,
              py: 3,
            }}
          >
            {step.content}
          </StepContent>
        </Step>
      ))}
    </StepperMui>
  );
};

export default Stepper;
