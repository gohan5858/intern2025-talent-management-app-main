"use client";
import { Box, Button } from "@mui/material";

export interface ButtonProps {
  text: string;
}

export function BackButton({ text }: ButtonProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button sx={{ margin: 2 }} onClick={() => window.history.back()}>
        {text}
      </Button>
    </Box>
  );
}
