import * as React from "react";
import { Alert, Button, IconButton, Modal, Stack, Tooltip, Typography } from "@mui/material";
import { COLORS } from "../../../style/colors";
import { Close, Error } from "@mui/icons-material";
import { BasicButton } from "../../../components/button/Button";
import axios from "axios";
import { API_URL } from "../../../routes/Url";
import { logout } from "../../../Config/Auth";

export const DeleteAccount = () => {
  const [isModalOpened, setIsModalOpened] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleClose = () => {
    setIsModalOpened(false);
  };

  const handleSubmit = async () => {
    try {
      await axios({
        method: "delete",
        url: API_URL + "/auth",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      setIsLoading(false);
      setErrorMessage("");
      logout();
    } catch (e: any) {
      setErrorMessage("Une erreur est survenue lors de la suppression de votre compte.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        color="secondary"
        onClick={() => setIsModalOpened(true)}
        sx={{
          color: COLORS.redBrown,
          textTransform: "unset",
          fontWeight: 600,
          padding: "1rem 2rem",
        }}
      >
        Delete your account
      </Button>

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
            background: "#fff",
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
          <Stack
            direction="column"
            gap={"1rem"}
            sx={{
              textAlign: "center",
              maxWidth: "100%",
              padding: "2rem 4rem",
              color: COLORS.redBrown,
              alignItems: "center",
              fontSize: "1.2rem",
            }}
          >
            <Error sx={{ fontSize: "4rem" }} />
            <Typography sx={{ fontWeight: 900 }}>Are you sure you want to delete your account ?</Typography>
            <Typography sx={{ fontWeight: 500 }}>
              All your data including your files will be definitly removed from the server.
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>This action is irreversible.</Typography>
            {!!errorMessage.length && <Alert severity="warning">{errorMessage}</Alert>}

            <Stack direction="row" gap="1rem">
              <BasicButton
                disabled={isLoading}
                sx={{ backgroundColor: COLORS.redBrown, "&:hover": { backgroundColor: COLORS.redBrownDark } }}
                onClick={handleSubmit}
              >
                Delete
              </BasicButton>
              <BasicButton
                disabled={isLoading}
                sx={{ backgroundColor: COLORS.babyBlue, color: COLORS.deepBlue }}
                onClick={handleClose}
              >
                Cancel
              </BasicButton>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default DeleteAccount;
