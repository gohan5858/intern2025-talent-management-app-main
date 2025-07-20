import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";
import { isLeft } from "fp-ts/Either";
import { Employee, EmployeeT } from "./Employee";
import { EmployeeDatabase } from "./EmployeeDatabase";

export class EmployeeDatabaseDynamoDB implements EmployeeDatabase {
  private client: DynamoDBClient;
  private tableName: string;

  constructor(client: DynamoDBClient, tableName: string) {
    this.client = client;
    this.tableName = tableName;
  }

  async getEmployee(id: string): Promise<Employee | undefined> {
    const input: GetItemCommandInput = {
      TableName: this.tableName,
      Key: {
        id: { S: id },
      },
    };
    const output = await this.client.send(new GetItemCommand(input));
    const item = output.Item;
    if (item == null) {
      return;
    }
    const employee = {
      id: id,
      name: item["name"].S,
      age: mapNullable(item["age"].N, (value) => parseInt(value, 10)),
      skills: item["skills"].L,
    };
    const decoded = EmployeeT.decode(employee);
    if (isLeft(decoded)) {
      throw new Error(
        `Employee ${id} is missing some fields. ${JSON.stringify(employee)}`
      );
    } else {
      return decoded.right;
    }
  }

  async getEmployees(
    filterText: string,
    affiliation: string,
    position: string
  ): Promise<Employee[]> {
    const input: ScanCommandInput = {
      TableName: this.tableName,
    };
    const output = await this.client.send(new ScanCommand(input));
    const items = output.Items;
    if (items == null) {
      return [];
    }
    return items
      .filter((item) => filterText === "" || item["name"].S === filterText)
      .filter(
        (item) => affiliation === "" || item["affiliation"].S === affiliation
      )
      .filter((item) => position === "" || item["position"].S === position)
      .map((item) => {
        return {
          id: item["id"].S,
          name: item["name"].S,
          age: mapNullable(item["age"].N, (value) => parseInt(value, 10)),
          skills: item["skills"].L,
        };
      })
      .flatMap((employee) => {
        const decoded = EmployeeT.decode(employee);
        if (isLeft(decoded)) {
          console.error(
            `Employee ${employee.id} is missing some fields and skipped. ${JSON.stringify(employee)}`
          );
          return [];
        } else {
          return [decoded.right];
        }
      });
  }

  private async getMaxId(): Promise<number> {
    const input: ScanCommandInput = {
      TableName: this.tableName,
      ProjectionExpression: "id",
    };
    const output = await this.client.send(new ScanCommand(input));
    const items = output.Items;
    if (items == null || items.length === 0) {
      return 0;
    }

    const maxId = Math.max(
      ...items
        .filter((item): item is { id: { S: string } } => item["id"].S != null)
        .map((item) => parseInt(item["id"].S, 10))
    );

    return maxId;
  }

  async saveEmployee(employee: Employee): Promise<Employee> {
    if (!employee.id) {
      const maxId = await this.getMaxId();
      employee.id = (maxId + 1).toString();
    }
    const input: PutItemCommandInput = {
      TableName: this.tableName,
      Item: {
        id: { S: employee.id },
        name: { S: employee.name },
        age: { N: employee.age.toString() },
        affiliation: { S: employee.affiliation },
        position: { S: employee.position },
      },
    };

    await this.client.send(new PutItemCommand(input));
    const savedEmployee = await this.getEmployee(employee.id);

    if (savedEmployee == undefined) {
      throw new Error(`Failed to save employee ${employee.id}`);
    }
    const decoded = EmployeeT.decode(savedEmployee);
    if (isLeft(decoded)) {
      throw new Error(
        `Saved employee ${employee.id} is missing some fields. ${JSON.stringify(savedEmployee)}`
      );
    }
    return employee;
  }
}

function mapNullable<T, U>(
  value: T | null | undefined,
  mapper: (value: T) => U
): U | undefined {
  if (value != null) {
    return mapper(value);
  }
}
