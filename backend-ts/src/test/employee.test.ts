import { EmployeeDatabaseInMemory } from "../employee/EmployeeDatabaseInMemory";
import {Employee} from "../employee/Employee";

describe("test employee in-memory db", () => {
  const database = new EmployeeDatabaseInMemory();

  let testEmployee1: Employee;

  beforeAll(async () => {
    testEmployee1 = await database.saveEmployee({
      name: "test1",
      age: 20,
      affiliation: "test_affiliation",
      position: "test_position",
      skills: [
        {
          name: "test_skill",
          level: 1,
          detail: "test_detail",
          tags: ["test_tag1", "test_tag2"]
        }
      ]
    });

    expect(testEmployee1.name).toBe("test1");
  });

  it("従業員を追加できるか", async () => {
    const employee = await database.saveEmployee({
      name: "test2",
      age: 20,
      affiliation: "test_affiliation2",
      position: "test_position2",
      skills: [],
    });

    expect(employee.name).toBe("test2");
  });

  it("従業員を追加したときにIDがインクリメントされているか", async () => {
    const employee1 = await database.saveEmployee({
      name: "test3",
      age: 20,
      affiliation: "test_affiliation3",
      position: "test_position3",
      skills: [],
    });
    const employee2 = await database.saveEmployee({
      name: "test4",
      age: 20,
      affiliation: "test_affiliation4",
      position: "test_position4",
      skills: [],
    });

    expect(Number(employee1.id)).toBe(Number(employee2.id) - 1);
  });

  it("従業員を取得できるか", async () => {
    const employee = await database.getEmployee(testEmployee1.id);
    expect(employee).toBe(testEmployee1);

    const employees = await database.getEmployees("", "", "");
    expect(employees).toContainEqual(testEmployee1);
  });

  it("テキストフィルタを用いて従業員を取得できるか", async () => {
    // 完全一致
    let employees = await database.getEmployees("test1", "", "");
    expect(employees).toContainEqual(testEmployee1);

    // 部分一致
    employees = await database.getEmployees("test", "", "");
    expect(employees).toContainEqual(testEmployee1);

    // 該当なし
    employees = await database.getEmployees("test10000", "", "");
    expect(employees).not.toContainEqual(testEmployee1);
  });

  it("所属フィルタを用いて従業員を取得できるか", async () => {
    // 完全一致
    let employees = await database.getEmployees("", "test_affiliation", "");
    expect(employees).toContainEqual(testEmployee1);

    // 該当なし
    employees = await database.getEmployees("", "test_affiliation!!", "");
    expect(employees).not.toContainEqual(testEmployee1);
  });

  it("役職フィルタを用いて従業員を取得できるか", async () => {
    // 完全一致
    let employees = await database.getEmployees("", "", "test_position");
    expect(employees).toContainEqual(testEmployee1);

    // 該当なし
    employees = await database.getEmployees("", "", "test_position!!");
    expect(employees).not.toContainEqual(testEmployee1);
  });
});