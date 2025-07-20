"use client";
import { useEffect } from "react";
import useSWR from "swr";
import * as t from "io-ts";
import { isLeft } from "fp-ts/Either";
import { EmployeeListItem } from "./EmployeeListItem";
import { EmployeeT } from "../models/Employee";
import { Box, Grid } from "@mui/material";
import { EmployeeApiResponse } from "@/types/EmployeeApiResponse";
import { FavoriteButton } from "./FavoriteButton";

export type SortMethod =
  | "default"
  | "age-asc"
  | "age-dsc"
  | "name-asc"
  | "name-desc";

export type EmployeesContainerProps = {
  filterText: string;
  affiliationFilter: string;
  positionFilter: string;
  sortMethod: SortMethod;
  viewMode: "list" | "card";
  pageNo: number;
  onTotalPagesChange: (totalPages: number) => void;
};

const EmployeesT = t.array(EmployeeT);

const employeesFetcher = async (url: string): Promise<EmployeeApiResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch employees at ${url}`);
  }
  const body = await response.json();
  const decoded = EmployeesT.decode(body.employees);
  if (isLeft(decoded)) {
    throw new Error(`Failed to decode employees ${JSON.stringify(body)}`);
  }
  return {
    employees: decoded.right,
    totalPages: body.totalPages,
  };
};

export function EmployeeListContainer({
  filterText,
  affiliationFilter,
  positionFilter,
  sortMethod,
  viewMode,
  pageNo,
  onTotalPagesChange,
}: EmployeesContainerProps) {
  const encodedFilterText = encodeURIComponent(filterText);
  const { data, error, isLoading } = useSWR<EmployeeApiResponse, Error>(
    `/api/employees?filterText=${encodedFilterText}&affiliation=${affiliationFilter}&position=${positionFilter}&viewMode=${viewMode}&sortMethod=${sortMethod}&pageNo=${pageNo}`,
    employeesFetcher
  );

  useEffect(() => {
    if (error != null) {
      console.error(`Failed to fetch employees filtered by filterText`, error);
    }
  }, [error, filterText]);

  const employees = data?.employees ?? [];
  const totalPages = data?.totalPages ?? 1;

  useEffect(() => {
    onTotalPagesChange(totalPages);
  }, [totalPages, onTotalPagesChange]);

  if (employees != null && viewMode === "card") {
    return (
      <Grid container spacing={2}>
        {employees.map((employee) => (
          <Grid key={employee.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <EmployeeListItem employee={employee} viewMode={viewMode} />
            <FavoriteButton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (data != null) {
    return employees.map((employee) => (
      <Box key={employee.id} display="flex" alignItems="center">
        <Box flex={1}>
          <EmployeeListItem employee={employee} viewMode={viewMode} />
        </Box>
        <FavoriteButton />
      </Box>
    ));
  }

  if (isLoading) {
    return <p>Loading employees...</p>;
  }
}
