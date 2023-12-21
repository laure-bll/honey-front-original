import * as React from "react";
import { Box, IconButton, Modal, Stack, Tooltip, Typography } from "@mui/material";
import useCreateAccountStore, { AddressApi } from "../../../hooks/zustand/CreateAccountStore";
import AddressForm from "../../../components/signup/AddressForm";
import { Close, ModeEdit } from "@mui/icons-material";
import Card from "../../../components/container/Card";
import { COLORS } from "../../../style/colors";
import axios from "axios";
import { isTokenValid } from "../../../Config/Auth";
import { API_URL } from "../../../routes/Url";
import Countries from "../../../helpers/Countries";

const BillingAddress = () => {
  const { profile, address, setProfile, setAddress } = useCreateAccountStore((state) => ({
    ...state.account,
    setProfile: state.setProfile,
    setAddress: state.setAddress,
  }));

  const [billingAddress, setBillingAddress] = React.useState<AddressApi>(address);
  const [isModalOpened, setIsModalOpened] = React.useState<boolean>(false);

  const handleClose = () => setIsModalOpened(false);

  const getUser = async () => {
    if (isTokenValid()) {
      const currentUser = await axios({
        method: "get",
        url: API_URL + "/auth",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      const { email, firstName, lastName, address } = currentUser.data;
      setProfile({ ...profile, email, firstName, lastName });
      const addr = { ...address, country: Countries.find((c) => c.code === address.country) };
      setAddress(addr);
      setBillingAddress(addr);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <Box maxWidth={"90%"}>
      <Card
        fullWidth
        content={
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ padding: "1rem, 0.5rem", width: "100%" }}
          >
            <Stack direction="column" gap={1}>
              <Typography>
                {profile.firstName} {profile.lastName.toUpperCase()}
              </Typography>
              <Typography>
                {billingAddress.address} {billingAddress.zip} {billingAddress.city} {billingAddress.country.label}
              </Typography>
            </Stack>
            <Box>
              <IconButton onClick={() => setIsModalOpened(true)}>
                <ModeEdit sx={{ fill: COLORS.deepBlue }} />
              </IconButton>
            </Box>
          </Stack>
        }
      />
      <Modal
        open={isModalOpened}
        onClose={handleClose}
        aria-labelledby="modal-billingAddress"
        aria-describedby="parent-modal-billingAddress"
        sx={{ display: "flex", justifyContent: "space-around" }}
      >
        <Stack
          direction="column"
          alignItems={"center"}
          sx={{
            background: "#F4F4F4",
            borderRadius: "20px",
            margin: "auto",
            padding: "1rem 2rem",
            minWidth: 500,
            maxWidth: "100%",
          }}
        >
          <Stack direction="row" justifyContent={"flex-end"} width={"100%"}>
            <Tooltip title="Close">
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Tooltip>
          </Stack>
          <Box
            component="h3"
            sx={{
              color: COLORS.royablBlue,
              fontSize: "2rem",
              fontWeight: 600,
            }}
          >
            Edit your billing address
          </Box>
          <AddressForm
            submitButton={{
              content: "Confirm",
              onClick: () => {
                setBillingAddress(address);
                handleClose();
              },
            }}
          />
        </Stack>
      </Modal>
    </Box>
  );
};

export default BillingAddress;
