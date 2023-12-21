import { create } from "zustand";

export interface ProfileApi {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface PurchaseApi {
  confirmed: boolean;
}

export interface AddressApi {
  address: string;
  zip: string;
  city: string;
  country: {
    code: string;
    label: string;
    phone: string;
  };
}

export interface AccountApi {
  profile: ProfileApi;
  purchase: PurchaseApi;
  address: AddressApi;
}

export interface CreateAccountState {
  account: AccountApi;
  setAccount: (account: AccountApi) => void;
  setProfile: (profile: ProfileApi) => void;
  setPurchase: (purchase: PurchaseApi) => void;
  setAddress: (address: AddressApi) => void;
}

const useCreateAccountStore = create<CreateAccountState>((set, get) => {
  const initAccount: AccountApi = {
    profile: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    purchase: {
      confirmed: false,
    },
    address: {
      address: "",
      zip: "",
      city: "",
      country: {
        code: "",
        label: "",
        phone: "",
      },
    },
  };
  return {
    account: initAccount,
    setAccount: (account) => set((prev) => ({ ...prev, account })),
    setProfile: (profile) => get().setAccount({ ...get().account, profile }),
    setPurchase: (purchase) => get().setAccount({ ...get().account, purchase }),
    setAddress: (address) => get().setAccount({ ...get().account, address }),
  };
});

export default useCreateAccountStore;
