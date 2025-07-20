import { EmployeeApiResponse } from "../types/EmployeeApiResponse";
import { SortMethod } from "../types/SortMethod";
import { Employee, EmployeeRegister } from "./Employee";

export interface EmployeeDatabase {
  getEmployee(id: string): Promise<Employee | undefined>;
  getEmployees(
    filterText: string,
    affiliation: string,
    position: string,
    viewMode: string,
    sortMethod: SortMethod,
    pageNo: number
  ): Promise<EmployeeApiResponse>;
  saveEmployee(employeeRegister: EmployeeRegister): Promise<Employee>;
}
