import PersonIcon from "@mui/icons-material/Person";

import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { Employee } from "../models/Employee";
import Link from "next/link";

export type EmployeeListItemProps = {
  employee: Employee;
  viewMode: "list" | "card";
};

export function EmployeeListItem({ employee, viewMode }: EmployeeListItemProps) {
  return (
    <Link
      href={`/employee?id=${employee.id}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          transition: "background-color 0.2s",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <CardContent>
          <Box display="flex" flexDirection={viewMode === "card" ? "column" : "row"} alignItems="center" gap={2}>
            <Avatar sx={{ width: 48, height: 48 }}>
              <PersonIcon sx={{ fontSize: 48 }} />
            </Avatar>
            <Box display="flex" flexDirection="column">
              <Typography>{employee.name}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
