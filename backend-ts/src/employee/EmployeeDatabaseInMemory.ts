import { EmployeeDatabase } from "./EmployeeDatabase";
import { Employee, EmployeeRegister } from "./Employee";
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
      skills: [],
    });
    this.employees.set("2", {
      id: "2",
      name: "John Smith",
      age: 28,
      affiliation: "人事",
      position: "部長",
      skills: [],
    });
    this.employees.set("3", {
      id: "3",
      name: "山田 太郎",
      age: 27,
      affiliation: "開発",
      position: "一般",
      skills: [
        { name: "TypeScript", level: 3, detail: "(スキルの説明)", tags: [] },
        {
          name: "React",
          level: 2,
          detail: "(スキルの説明)",
          tags: ["Redux", "MUI"],
        },
        {
          name: "Next.js",
          level: 1,
          detail:
            "(スキルの説明)(スキルの説明)(スキルの説明)(スキルの説明)(スキルの説明)(スキルの説明)",
          tags: ["App Router"],
        },
      ],
    });
    this.employees.set("4", {
      id: "4",
      name: "山田 太郎2",
      age: 27,
      affiliation: "開発",
      position: "一般",
      skills: [
        { name: "TypeScript", level: 3, detail: "(スキルの説明)", tags: [] },
        {
          name: "React",
          level: 2,
          detail: "(スキルの説明)",
          tags: ["Redux", "MUI"],
        },
        {
          name: "Next.js",
          level: 1,
          detail:
            "(スキルの説明)(スキルの説明)(スキルの説明)(スキルの説明)(スキルの説明)(スキルの説明)",
          tags: ["App Router"],
        },
      ],
    });
    this.employees.set("5", {
      id: "5",
      name: "Jane Doe2",
      age: 22,
      affiliation: "人事",
      position: "主任",
      skills: [],
    });
    this.employees.set("6", {
      id: "6",
      name: "Jane Doe3",
      age: 22,
      affiliation: "人事",
      position: "主任",
      skills: [],
    });
    this.employees.set("7", {
      id: "7",
      name: "Jane Doe4",
      age: 22,
      affiliation: "人事",
      position: "主任",
      skills: [],
    });
    this.employees.set("8", {
      id: "8",
      name: "Jane Doe5",
      age: 22,
      affiliation: "人事",
      position: "主任",
      skills: [],
    });
    this.employees.set("9", {
      id: "9",
      name: "Jane Doe6",
      age: 22,
      affiliation: "人事",
      position: "主任",
      skills: [],
    });
    this.employees.set("10", {
      id: "10",
      name: "Jane Doe",
      age: 22,
      affiliation: "人事",
      position: "主任",
      skills: [],
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

  private async getMaxId(): Promise<number> {
    if (this.employees.size === 0) {
      return 0;
    }
    const maxID = Array.from(this.employees.keys())
      .map((id) => parseInt(id))
      .reduce((max, id) => (max > id ? max : id), 0);

    return maxID;
  }

  async saveEmployee(employeeRegister: EmployeeRegister): Promise<Employee> {
    const id = ((await this.getMaxId()) + 1).toString();
    const employee: Employee = {
      id,
      ...employeeRegister,
      skills: employeeRegister.skills ?? [],
    };
    this.employees.set(employee.id, employee);
    return employee;
  }
}
