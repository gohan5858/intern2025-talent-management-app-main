"use client";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";
import { EmployeeListContainer, SortMethod } from "./EmployeeListContainer";

export function SearchEmployees() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [affiliationFilter, setAffiliationFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [sortMethod, setSortMethod] = useState<SortMethod>("default");

  const handleSortMethodSelected = (event: SelectChangeEvent) => {
    setSortMethod(event.target.value as SortMethod);
  };

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
          <Grid size={{ sm: 12, md: 5 }}>
            <TextField
              fullWidth
              placeholder="所属を入力してください"
              value={affiliationFilter}
              onChange={(e) => setAffiliationFilter(e.target.value)}
            />
          </Grid>
          <Grid size={{ sm: 12, md: 5 }}>
            <TextField
              fullWidth
              placeholder="役職を入力してください"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            />
          </Grid>
          <Grid size={{ sm: 12, md: 2 }}>
            <div>
              <FormControl fullWidth>
                <InputLabel id="sort-label">並び替え</InputLabel>
                <Select
                  labelId="sort-label"
                  value={sortMethod}
                  label="並び替える"
                  onChange={handleSortMethodSelected}
                >
                  <MenuItem value="default">指定しない</MenuItem>
                  <MenuItem value="age-asc">年齢順（昇順）</MenuItem>
                  <MenuItem value="age-dsc">年齢順（降順）</MenuItem>
                  <MenuItem value="name-asc">名前順（昇順）</MenuItem>
                  <MenuItem value="name-desc">名前順（降順）</MenuItem>
                </Select>
              </FormControl>
            </div>
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
          sortMethod={sortMethod}
          viewMode={viewMode}
        />
      </Paper>
    </>
  );
}
