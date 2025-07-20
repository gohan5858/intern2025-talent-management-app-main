import { EmployeeDatabase } from "./EmployeeDatabase";
import { Employee } from "./Employee";
import { SortMethod } from "../types/SortMethod";
import { EmployeeApiResponse } from "../types/EmployeeApiResponse";
import { pageRow } from "../types/PageNo";

export class EmployeeDatabaseInMemory implements EmployeeDatabase {
  private employees: Map<string, Employee>;

  constructor() {
    this.employees = new Map<string, Employee>();
    this.employees.set("1", {
      id: "1",
      name: "Jane Doe",
      age: 22,
      affiliation: "人事",
      position: "主任",
    });
    this.employees.set("2", {
      id: "2",
      name: "John Smith",
      age: 28,
      affiliation: "人事",
      position: "部長",
    });
    this.employees.set("3", {
      id: "3",
      name: "山田 太郎1",
      age: 117,
      affiliation: "開発",
      position: "一般",
    });
    this.employees.set("4", {
      id: "4",
      name: "山田 太郎2",
      age: 107,
      affiliation: "開発",
      position: "一般",
    });
    this.employees.set("5", {
      id: "5",
      name: "山田 太郎3",
      age: 97,
      affiliation: "開発",
      position: "一般",
    });
    this.employees.set("6", {
      id: "6",
      name: "山田 太郎4",
      age: 87,
      affiliation: "開発",
      position: "一般",
    });
    this.employees.set("7", {
      id: "7",
      name: "山田 太郎5",
      age: 77,
      affiliation: "開発",
      position: "一般",
    });
    this.employees.set("8", {
      id: "8",
      name: "山田 太郎6",
      age: 67,
      affiliation: "開発",
      position: "一般",
    });
    this.employees.set("9", {
      id: "9",
      name: "山田 太郎7",
      age: 57,
      affiliation: "開発",
      position: "一般",
    });
    this.employees.set("10", {
      id: "10",
      name: "山田 太郎8",
      age: 47,
      affiliation: "開発",
      position: "一般",
    });
    this.employees.set("11", {
      id: "11",
      name: "山田 太郎9",
      age: 37,
      affiliation: "開発",
      position: "一般",
    });
  }

  async getEmployee(id: string): Promise<Employee | undefined> {
    return this.employees.get(id);
  }

  async getEmployees(
    filterText: string,
    affiliation: string,
    position: string,
    viewMode: string,
    sortMethod: SortMethod,
    pageNo: number
  ): Promise<EmployeeApiResponse> {
    let employees = Array.from(this.employees.values());

    if (filterText !== "") {
      employees = employees.filter((employee) =>
        employee.name.includes(filterText)
      );
    }

    if (affiliation !== "") {
      employees = employees.filter(
        (employee) => employee.affiliation === affiliation
      );
    }

    if (position !== "") {
      employees = employees.filter(
        (employee) => employee.position === position
      );
    }

    switch (sortMethod) {
      case "age-asc":
        employees.sort((a, b) => a.age - b.age);
        break;
      case "age-dsc":
        employees.sort((a, b) => b.age - a.age);
        break;
      case "name-asc":
        employees.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        employees.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    const sortedDataLength = employees.length;
    const row = pageRow(viewMode);
    const startIndex = (pageNo - 1) * row;
    const endIndex =
      startIndex + row > sortedDataLength ? sortedDataLength : startIndex + row;
    const paginatedEmployees = employees.slice(startIndex, endIndex);

    const totalPages = Math.ceil(employees.length / row);
    return {
      employees: paginatedEmployees,
      totalPages: totalPages,
    };
  }
}
