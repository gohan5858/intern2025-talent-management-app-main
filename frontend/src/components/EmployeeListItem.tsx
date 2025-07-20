import PersonIcon from "@mui/icons-material/Person";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Employee } from "../models/Employee";
import { FavoriteButton } from "./FavoriteButton";

export type EmployeeListItemProps = {
  employee: Employee;
  viewMode: "list" | "card";
};

export function EmployeeListItem({
  employee,
  viewMode,
}: EmployeeListItemProps) {
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
          <Box
            display="flex"
            flexDirection={viewMode === "card" ? "column" : "row"}
            alignItems="center"
            gap={2}
          >
            <Avatar sx={{ width: 48, height: 48 }}>
              <PersonIcon sx={{ fontSize: 48 }} />
            </Avatar>
            <Box
              display="flex"
              flexDirection="column"
              gap={1}
              alignItems={viewMode === "card" ? "center" : "flex-start"}
            >
              <Typography>{employee.name}</Typography>
              <Box
                display="flex"
                flexDirection="row"
                gap={1}
                flexWrap="wrap"
                alignItems="center"
              >
                <Chip label={employee.affiliation} variant="outlined" />
                <Chip label={employee.position} variant="outlined" />
                <Chip label={`${employee.age}歳`} variant="outlined" />
              </Box>
            </Box>
            <Box
              mt={viewMode === "card" ? 2 : 0}
              alignSelf={viewMode === "card" ? "center" : "right"}
            >
              <FavoriteButton employeeId={"ss"} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
