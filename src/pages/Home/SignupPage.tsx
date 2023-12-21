import * as React from "react";
import { Stack } from "@mui/material";
import SignupTitle from "../../components/signup/SignupTitle";
import ProfileForm from "../../components/signup/ProfileForm";
import HomeLayout from "../../layouts/HomeLayout";
import Stepper, { StepEnum } from "../../components/steps/Stepper";
import PurchaseForm from "../../components/signup/PurchaseForm";
import AddressForm from "../../components/signup/AddressForm";
import Payment from "../../components/stripe/Payment";

const SignupPage = () => {
  const [currentStep, setCurrentStep] = React.useState<StepEnum>(StepEnum.Profile);

  return (
    <HomeLayout
      content={
        <Stack
          spacing={{ xs: 6 }}
          direction="column"
          useFlexGap
          flexWrap="wrap"
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <SignupTitle />

          <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />

          {currentStep === StepEnum.Profile && (
            <ProfileForm
              minWidth={20}
              submitButton={{ onClick: () => setCurrentStep(StepEnum.Payment), content: "Next" }}
            />
          )}

          {currentStep === StepEnum.Payment && <PurchaseForm goToNextStep={() => setCurrentStep(StepEnum.Address)} />}

          {currentStep === StepEnum.Address && (
            <AddressForm submitButton={{ content: "Next", onClick: () => setCurrentStep(StepEnum.Finalization) }} />
          )}

          {currentStep === StepEnum.Finalization && <Payment isSigningUp />}
        </Stack>
      }
    />
  );
};

export default SignupPage;
