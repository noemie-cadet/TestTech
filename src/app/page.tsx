"use client";

import { JobsList } from "@/components/jobsList";
import "../firebase/initFirebase";
import { Box, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        p: 6,
      }}
    >
      <Box position="relative" width="100%">
        <Button
          href="job/create"
          variant="contained"
          color="primary"
          sx={{
            position: "absolute",
            top: -40,
            right: 0,
          }}
        >
          Ajouter une annonce
        </Button>
      </Box>
      <Typography variant="h1" sx={{ fontSize: "2.5rem", fontWeight: "bold" }}>
        Jobs
      </Typography>
      <JobsList />
    </Box>
  );
}
