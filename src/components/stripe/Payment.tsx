import { Alert, CircularProgress } from "@mui/material";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import * as React from "react";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import { API_URL } from "../../routes/Url";

const stripePromise = loadStripe(process.env.REACT_APP_CLIENT_PUBLIC_STRIPE!);

interface PaymentProps {
  isSigningUp: boolean;
}

const Payment = ({ isSigningUp }: PaymentProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [clientSecret, setClientSecret] = React.useState<{ client_secret: string } | undefined>();
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const options: StripeElementsOptions = {
    clientSecret: clientSecret?.client_secret,
    appearance: {
      theme: "stripe",
      rules: {
        ".Tab, .Input": {
          borderRadius: "10px",
          backgroundColor: "#FFF",
          fontSize: "16px",
          padding: "16.5px 14px",
          boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)",
        },
      },
    },
  };

  const getClientSecret = async () => {
    try {
      const response = await axios({
        method: "post",
        url: API_URL + "/payment/secret",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {},
      });

      setClientSecret(response.data);
      setIsLoading(false);
      setErrorMessage("");
    } catch (e: any) {
      setIsLoading(false);
      setErrorMessage("Le paiement n'est actuellement pas disponible.");
    }
  };

  React.useEffect(() => {
    getClientSecret();
  }, []);

  return isLoading ? (
    <CircularProgress />
  ) : !clientSecret || !!errorMessage.length ? (
    <Alert severity="error">{errorMessage}</Alert>
  ) : (
    <Elements stripe={stripePromise} options={options}>
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <CheckoutForm isSigningUp={isSigningUp} stripe={stripe} elements={elements} clientSecret={clientSecret} />
        )}
      </ElementsConsumer>
    </Elements>
  );
};

export default Payment;
