"use client";

import { FormControlLabel, Switch } from "@mui/material";
import { useTheme } from "./ThemeContext";

function DarkModeBar() {
  const { mode, setMode } = useTheme();

  const handleChangeMode = () => {
    setMode(mode == "light" ? "dark" : "light");
  };

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={mode == "dark"}
            onChange={handleChangeMode}
            color="primary"
          />
        }
        label={mode == "dark" ? "🌙" : "💡"}
      />
    </>
  );
}

export default DarkModeBar;
