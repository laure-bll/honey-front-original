import React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <HomeLayout
      content={
        <>
          <h2>Oops!</h2>
          <p>You are not allowed to access this page.</p>
          <Button color="secondary" onClick={() => navigate(-1)}>
            Back to home
          </Button>
        </>
      }
    />
  );
};

export default NotFound;
