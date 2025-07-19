"use client";
import { useEffect } from "react";
import useSWR from "swr";
import * as t from "io-ts";
import { isLeft } from "fp-ts/Either";
import { EmployeeListItem } from "./EmployeeListItem";
import { Employee, EmployeeT } from "../models/Employee";
import { Grid } from "@mui/material";

export type EmployeesContainerProps = {
  filterText: string;
  affiliationFilter: string;
  positionFilter: string;
  viewMode: "list" | "card";
};

const EmployeesT = t.array(EmployeeT);

const employeesFetcher = async (url: string): Promise<Employee[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch employees at ${url}`);
  }
  const body = await response.json();
  const decoded = EmployeesT.decode(body);
  if (isLeft(decoded)) {
    throw new Error(`Failed to decode employees ${JSON.stringify(body)}`);
  }
  return decoded.right;
};

export function EmployeeListContainer({
  filterText,
  affiliationFilter,
  positionFilter,
  viewMode,
}: EmployeesContainerProps) {
  const encodedFilterText = encodeURIComponent(filterText);
  const { data, error, isLoading } = useSWR<Employee[], Error>(
    `/api/employees?filterText=${encodedFilterText}&affiliation=${affiliationFilter}&position=${positionFilter}`,
    employeesFetcher
  );
  useEffect(() => {
    if (error != null) {
      console.error(`Failed to fetch employees filtered by filterText`, error);
    }
  }, [error, filterText]);

  if (data != null && viewMode === "card") {
    return (
      <Grid container spacing={2}>
        {data.map((employee) => (
          <Grid key={employee.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <EmployeeListItem employee={employee} viewMode={viewMode} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (data != null) {
    return data.map((employee) => (
      <EmployeeListItem
        employee={employee}
        key={employee.id}
        viewMode={viewMode}
      />
    ));
  }

  if (isLoading) {
    return <p>Loading employees...</p>;
  }
}
