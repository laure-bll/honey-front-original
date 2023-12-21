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
} from "@mui/material";
import { COLORS } from "../../style/colors";

export enum StepEnum {
  "Profile",
  "Payment",
  "Address",
  "Finalization",
}

export const steps: number[] = Object.values(StepEnum)
  .filter((s) => typeof s === "number")
  .map((s) => Number(s));

interface StepperProps {
  currentStep: StepEnum;
  setCurrentStep?: (step: StepEnum) => void;
}

const Stepper = ({ currentStep, setCurrentStep }: StepperProps) => {
  const Connector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 15,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: COLORS.enabled,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: COLORS.enabled,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: COLORS.muted,
      borderTopWidth: 2,
      borderRadius: 1,
    },
  }));

  return (
    <StepperMui
      activeStep={currentStep}
      alternativeLabel
      connector={<Connector />}
      sx={{
        "&.MuiStepper-root": {
          width: "100% !important",
        },
      }}
    >
      {steps.map((step) => (
        <Step key={step}>
          <StepLabel
            icon={
              <Box
                sx={{
                  width: "37px",
                  height: "36px",
                  flexShrink: 0,
                  borderRadius: "10px",
                  background: step <= currentStep ? COLORS.enabled : COLORS.muted,
                  color: "#FFF",
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  onClick={() => !!setCurrentStep && currentStep > step && setCurrentStep(step)}
                  sx={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: 600,
                    cursor: !!setCurrentStep && currentStep > step ? "pointer" : "default",
                  }}
                >
                  {step + 1}
                </Typography>
              </Box>
            }
          >
            {StepEnum[step]}
          </StepLabel>
        </Step>
      ))}
    </StepperMui>
  );
};

export default Stepper;
