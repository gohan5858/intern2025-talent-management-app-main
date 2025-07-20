import { Employee } from "../employee/Employee";

export type EmployeeApiResponse = {
  employees: Employee[];
  totalPages: number;
};
