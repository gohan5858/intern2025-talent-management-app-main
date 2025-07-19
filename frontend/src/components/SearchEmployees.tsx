"use client";
import { Paper, TextField } from "@mui/material";
import { useState } from "react";
import { EmployeeListContainer } from "./EmployeeListContainer";

export function SearchEmployees() {
  const [searchKeyword, setSearchKeyword] = useState("");
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
        <EmployeeListContainer
          key="employeesContainer"
          filterText={searchKeyword}
        />
      </Paper>
    </>
  );
}
