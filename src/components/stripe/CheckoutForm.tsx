import * as React from "react";
import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js";
import { BasicButton } from "../button/Button";
import { Alert, Box, CircularProgress, Stack } from "@mui/material";
import BasicLabel from "../form/BasicLabel";
import useCreateAccountStore from "../../hooks/zustand/CreateAccountStore";
import { CARD_NUMBER_OPTIONS, CARD_EXPIRY_OPTIONS, CARD_CVC_OPTIONS } from "./CardElements";
import InputWithLabel from "../form/InputWithLabel";
import { COLORS } from "../../style/colors";
import { API_URL } from "../../routes/Url";
import axios from "axios";
import { isTokenValid } from "../../Config/Auth";
import { Link, useNavigate } from "react-router-dom";

interface CheckoutFormProps {
  stripe: any;
  elements: any;
  clientSecret: { client_secret: string };
  isSigningUp: boolean;
}

// TODO:
// verifier le format email et telephone

const CheckoutForm = ({ stripe, elements, clientSecret, isSigningUp }: CheckoutFormProps) => {
  const navigate = useNavigate();
  const { address, profile } = useCreateAccountStore((state) => state.account);

  const [billingEmail, setBillingEmail] = React.useState<string>(profile.email);

  const [billingName, setBillingName] = React.useState<string>(
    profile.firstName || profile.lastName ? profile.firstName + " " + profile.lastName.toUpperCase() : "",
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const [successMessage, setSuccessMessage] = React.useState<string>("");

  const [elementsCardValidity, setElementsCardValidity] = React.useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmCardPayment(clientSecret.client_secret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          address: {
            city: address.city,
            country: address.country.code,
            line1: address.address,
            postal_code: address.zip,
          },
          name: billingName,
        },
      },
      setup_future_usage: "off_session",
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      try {
        const billingAddress = {
          zip: address.zip,
          country: address.country.code,
          city: address.city,
          address: address.address,
        };

        if (isSigningUp) {
          const response = await axios({
            method: "post",
            url: API_URL + "/auth/signup",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: { ...billingAddress, ...profile },
          });

          setIsLoading(false);
          localStorage.setItem("token", response.data.userToken.toString());
          isTokenValid() ? (window.location.pathname = "dashboard") : navigate("/login");
        } else {
          await axios({
            method: "post",
            url: API_URL + "/invoices",
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            data: { ...billingAddress },
          });

          setIsLoading(false);
          setErrorMessage("");
          setSuccessMessage("Congrats you've added successfully your storage !");
        }
      } catch (err) {
        setIsLoading(false);
        setErrorMessage("Oops, something went wront !");
        setSuccessMessage("");
      }
    }
    setIsLoading(false);
  };

  const isDisabled =
    Object.values(elementsCardValidity).includes(false) ||
    !billingName ||
    !billingName.length ||
    !billingEmail ||
    !billingEmail.length;

  return (
    <Stack
      direction="column"
      gap={1}
      sx={{
        mb: "2rem",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <BasicLabel content="CardNumber" />
      <CardNumberElement
        options={CARD_NUMBER_OPTIONS}
        id="CardNumber"
        onChange={({ error, empty }) =>
          setElementsCardValidity((prev) => ({
            ...prev,
            cardNumber: error === undefined && !empty,
          }))
        }
      />
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        sx={{
          gap: 2,
          mb: 2,
        }}
      >
        <Stack direction="column" gap={1} width={{ xs: "100%", md: "50%" }}>
          <BasicLabel content="Expiration date" />
          <CardExpiryElement
            options={CARD_EXPIRY_OPTIONS}
            id="CardExpiry"
            onChange={({ error, empty }) =>
              setElementsCardValidity((prev) => ({
                ...prev,
                cardExpiry: error === undefined && !empty,
              }))
            }
          />
        </Stack>
        <Stack direction="column" gap={1} width={{ xs: "100%", md: "50%" }}>
          <BasicLabel content="CVC" />
          <CardCvcElement
            options={CARD_CVC_OPTIONS}
            id="CardCvc"
            onChange={({ error, empty }) =>
              setElementsCardValidity((prev) => ({
                ...prev,
                cardCvc: error === undefined && !empty,
              }))
            }
          />
        </Stack>
      </Stack>

      <Stack direction={"column"} gap={1}>
        <InputWithLabel
          label={"Name on card"}
          type="text"
          placeholder="John DOE"
          value={billingName}
          onChange={(e) => setBillingName(e.target.value)}
        />
      </Stack>

      <BasicButton
        onClick={handleSubmit}
        disabled={isLoading || isDisabled || !!successMessage.length}
        fullWidth
        customColor={COLORS.darkRoyalBlue}
      >
        {isLoading ? (
          <Box sx={{ alignItems: "center" }}>
            Paiement en cours
            <CircularProgress size={20} />
          </Box>
        ) : (
          "Pay now"
        )}
      </BasicButton>

      {!!errorMessage && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {errorMessage}
        </Alert>
      )}
      {!!successMessage.length && (
        <Alert severity="success" sx={{ mt: 1 }}>
          {successMessage} <Link to={"/dashboard"}>Let's go to your dashboard !</Link>
        </Alert>
      )}
    </Stack>
  );
};

export default CheckoutForm;
