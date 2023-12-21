import { StripeCardElementOptions } from "@stripe/stripe-js";

export const CARD_NUMBER_OPTIONS: StripeCardElementOptions = {
  style: {
    base: {
      "::placeholder": {},
      lineHeight: "3.2rem",
      backgroundColor: "#FFF",
      fontSize: "16px",
      padding: "16.5px 14px",
    },
    invalid: {
      iconColor: "#fa755a",
    },
  },
};

export const CARD_CVC_OPTIONS: StripeCardElementOptions = {
  style: {
    base: {
      "::placeholder": {},
      lineHeight: "3.2rem",
      fontSize: "16px",
      padding: "16.5px 14px",
      backgroundColor: "#FFF",
    },
    invalid: {
      iconColor: "#fa755a",
    },
  },
};

export const CARD_EXPIRY_OPTIONS: StripeCardElementOptions = {
  style: {
    base: {
      "::placeholder": {},
      lineHeight: "3.2rem",
      padding: "16.5px 14px",
      fontSize: "16px",
      backgroundColor: "#FFF",
    },
    invalid: {
      iconColor: "#fa755a",
    },
  },
};
