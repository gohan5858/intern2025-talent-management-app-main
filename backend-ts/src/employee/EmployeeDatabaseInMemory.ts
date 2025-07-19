import { EmployeeDatabase } from "./EmployeeDatabase";
import { Employee } from "./Employee";

export class EmployeeDatabaseInMemory implements EmployeeDatabase {
    private employees: Map<string, Employee>

    constructor() {
        this.employees = new Map<string, Employee>();
        this.employees.set("1", { id: "1", name: "Jane Doe", age: 22, affiliation: "人事", position: "主任" });
        this.employees.set("2", { id: "2", name: "John Smith", age: 28, affiliation: "人事", position: "部長" });
        this.employees.set("3", { id: "3", name: "山田 太郎", age: 27, affiliation: "開発", position: "一般" });
    }

    async getEmployee(id: string): Promise<Employee | undefined> {
        return this.employees.get(id);
    }

    async getEmployees(filterText: string, affiliation: string, position: string): Promise<Employee[]> {
        let employees = Array.from(this.employees.values());

        if (filterText !== "") {
            employees = employees.filter(employee => employee.name.includes(filterText));
        }

        if (affiliation !== "") {
            employees = employees.filter(employee => employee.affiliation === affiliation);
        }

        if (position !== "") {
            employees = employees.filter(employee => employee.position === position);
        }

        return employees;
    }
}
