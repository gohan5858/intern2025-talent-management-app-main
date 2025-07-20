import { Employee } from "@/models/Employee";

export type EmployeeApiResponse = {
  employees: Employee[];
  totalPages: number;
};
