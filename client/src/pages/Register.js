import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { Box } from "@mui/material";
import PageTransition from "../components/PageTransition";

export default function Register() {
  return (
    <PageTransition>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom, #2C3140, #3D4353)",
        }}
      >
        <SignUp
          path="/register"
          routing="path"
          signInUrl="/login"
          appearance={{
            elements: {
              card: {
                backgroundColor: "#2C3140",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                borderRadius: "12px",
              },
            },
            variables: {
              colorPrimary: "#A3B087",
              colorBackground: "#2C3140",
              colorText: "#fff",
              colorTextSecondary: "#d9d9d9",
            },
          }}
        />
      </Box>
    </PageTransition>

  );
}
