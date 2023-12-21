import * as React from "react";
import Card from "../container/Card";
import { Box, Divider, FormControlLabel, Radio, Typography } from "@mui/material";
import { COLORS } from "../../style/colors";
import { BasicButton } from "../button/Button";
import { AMOUNT_TTC, AMOUNT_WITHOUT_TAXES, UNIT } from "../../amount";
import useCreateAccountStore from "../../hooks/zustand/CreateAccountStore";

interface PurchaseFormProps {
  goToNextStep: () => void;
}

const PurchaseForm = ({ goToNextStep }: PurchaseFormProps) => {
  const { setPurchase } = useCreateAccountStore((state) => state);

  const handleSubmit = () => {
    setPurchase({ confirmed: true });
    goToNextStep();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        gap: "4rem",
      }}
    >
      <Card
        content={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
              minHeight: "20rem",
              gap: "1rem",
            }}
          >
            <Typography
              sx={{
                color: COLORS.deepBlue,
                fontSize: "25px",
                fontWeight: 600,
              }}
            >
              You are about to purchase :
            </Typography>

            <FormControlLabel
              value="end"
              control={<Radio checked />}
              label=" 20 Go of storage"
              sx={{
                ".MuiTypography-root": {
                  color: COLORS.darkGrey,
                  textAlign: "center",
                  fontSize: "20px",
                },
              }}
            />

            <Divider />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>Subtotal</Typography>
              <Typography>
                {AMOUNT_WITHOUT_TAXES.toFixed(2)}
                {UNIT}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography>
                {AMOUNT_TTC.toFixed(2)}
                {UNIT}
              </Typography>
            </Box>
          </Box>
        }
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          my: 2,
        }}
      >
        <BasicButton onClick={handleSubmit}>Next</BasicButton>
      </Box>
    </Box>
  );
};

export default PurchaseForm;
