import { Employee } from "./Employee";

export interface EmployeeDatabase {
  getEmployee(id: string): Promise<Employee | undefined>;
  getEmployees(
    filterText: string,
    affiliation: string,
    position: string
  ): Promise<Employee[]>;
}
