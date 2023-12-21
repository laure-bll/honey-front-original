import { Box, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import * as React from "react";
import { COLORS } from "../../../style/colors";

const OrderSummary = () => {

  const advantages: string[] = ["Access to your data", "Increase your storage", "Smooth interface"];
  const items: { label: string; price: string }[] = [
    {
      label: "20 GO of storage",
      price: "15.28 €",
    },
    {
      label: "Taxes",
      price: "5.62 €",
    },
    {
      label: "Subtotal",
      price: "20.00 € TTC",
    },
    {
      label: "Total",
      price: "20.00 €",
    },
  ];

  return (
    <Stack
      direction="column"
      gap={2}
      sx={{
        width: "335px",
        maxWidth: "100%",
      }}
    >
      <Box
        component="h3"
        sx={{
          color: COLORS.deepBlue,
          fontSize: "30px",
          fontWeight: 500,
          mb: 0,
        }}
      >
        Order Summary
      </Box>
      <List>
        {advantages.map((advantage, i) => (
          <ListItem key={i}>
            <ListItemIcon>
              <CheckCircle sx={{ fill: COLORS.lightGreen }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box
                  sx={{
                    color: COLORS.lightGreen,
                    fontWeight: 600,
                  }}
                >
                  {advantage}
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
      <List>
        {items.map((item, index) => {
          const isLastItem: boolean = index === items.length - 1;

          return (
            <ListItem key={item.label}>
              <ListItemText
                primary={
                  <Stack
                    direction="row"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    sx={{ color: COLORS.deepBlue, mt: isLastItem ? "1rem" : "initial" }}
                  >
                    <Typography
                      sx={{
                        fontSize: isLastItem ? "2rem" : "1rem",
                        fontWeight: isLastItem ? 600 : 500,
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: isLastItem ? "32px" : "1rem",
                        fontWeight: isLastItem ? 600 : 500,
                      }}
                    >
                      {item.price}
                    </Typography>
                  </Stack>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
};

export default OrderSummary;
