"use client";
import { Box, styled } from "@mui/material";

export const PrimaryBox = styled(Box)(({ theme }) => ({
  paddingTop: "50px !important",
  paddingBottom: "50px !important",
  [theme.breakpoints.down("lg")]: {
    paddingTop: "45px !important",
    paddingBottom: "45px !important",
  },
  [theme.breakpoints.down("md")]: {
    paddingTop: "40px !important",
    paddingBottom: "40px !important",
  },
  [theme.breakpoints.down("sm")]: {
    paddingTop: "30px !important",
    paddingBottom: "30px !important",
  },
  [theme.breakpoints.down("sx")]: {
    paddingTop: "15px !important",
    paddingBottom: "15px !important",
  },
}));