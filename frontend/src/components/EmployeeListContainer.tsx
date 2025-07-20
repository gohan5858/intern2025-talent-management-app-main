"use client";
import { useEffect } from "react";
import useSWR from "swr";
import * as t from "io-ts";
import { isLeft } from "fp-ts/Either";
import { EmployeeListItem } from "./EmployeeListItem";
import { Employee, EmployeeT } from "../models/Employee";
import { Grid } from "@mui/material";

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

const sortEmployees = (
  sortMethod: SortMethod,
  data: Employee[]
): Employee[] => {
  switch (sortMethod) {
    case "default":
      return data;
    case "age-asc":
      return [...data].sort((a, b) => a.age - b.age);
    case "age-dsc":
      return [...data].sort((a, b) => b.age - a.age);
    case "name-asc":
      return [...data].sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return [...data].sort((a, b) => b.name.localeCompare(a.name));
    default:
      return data;
  }
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
  const { data, error, isLoading } = useSWR<Employee[], Error>(
    `/api/employees?filterText=${encodedFilterText}&affiliation=${affiliationFilter}&position=${positionFilter}`,
    employeesFetcher
  );

  const pageRow = 5;
  const totalPages = data ? Math.ceil(data.length / pageRow) : 0;

  useEffect(() => {
    if (error != null) {
      console.error(`Failed to fetch employees filtered by filterText`, error);
    }
  }, [error, filterText]);

  useEffect(() => {
    onTotalPagesChange(totalPages);
  }, [totalPages, onTotalPagesChange]);

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
    const sortedData = sortEmployees(sortMethod, data);
    const sortedDataLength = sortedData.length;
    const startIndex = (pageNo - 1) * pageRow;
    const endIndex =
      startIndex + pageRow > sortedDataLength
        ? sortedDataLength
        : startIndex + pageRow;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    return paginatedData.map((employee) => (
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
