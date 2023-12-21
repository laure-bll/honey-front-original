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
          <p>Sorry, the page is not found.</p>
          <Button color="secondary" onClick={() => navigate("/")}>
            Go to home page
          </Button>
        </>
      }
    />
  );
}

export default NotFound;