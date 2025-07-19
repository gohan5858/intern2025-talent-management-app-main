"use client";
import {
  Grid,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";
import { EmployeeListContainer } from "./EmployeeListContainer";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

export function SearchEmployees() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [affiliationFilter, setAffiliationFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");

  const [viewMode, setViewMode] = useState<"list" | "card">("list");

  const handleChangeViewMode = (
    _: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    setViewMode(value as "list" | "card");
  };

  return (
    <>
      <title>タレントマネジメントシステム - 社員検索</title>

      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1,
          p: 2,
        }}
      >
        <TextField
          placeholder="検索キーワードを入力してください"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <Grid container spacing={2}>
          <Grid size={{ sm: 12, md: 6 }}>
            <TextField
              fullWidth
              placeholder="所属を入力してください"
              value={affiliationFilter}
              onChange={(e) => setAffiliationFilter(e.target.value)}
            />
          </Grid>
          <Grid size={{ sm: 12, md: 6 }}>
            <TextField
              fullWidth
              placeholder="役職を入力してください"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            />
          </Grid>
        </Grid>

        <ToggleButtonGroup
          exclusive
          value={viewMode}
          onChange={handleChangeViewMode}
        >
          <ToggleButton value="list" aria-label="list">
            <FormatListBulletedIcon />
          </ToggleButton>
          <ToggleButton value="card" aria-label="card">
            <ViewModuleIcon />
          </ToggleButton>
        </ToggleButtonGroup>

        <EmployeeListContainer
          key="employeesContainer"
          filterText={searchKeyword}
          affiliationFilter={affiliationFilter}
          positionFilter={positionFilter}
          viewMode={viewMode}
        />
      </Paper>
    </>
  );
}
