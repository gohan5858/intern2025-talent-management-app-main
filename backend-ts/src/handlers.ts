import type {
  LambdaFunctionURLEvent,
  LambdaFunctionURLResult,
} from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Employee, EmployeeRegister } from "./employee/Employee";
import { EmployeeDatabaseDynamoDB } from "./employee/EmployeeDatabaseDynamoDB";
import { EmployeeDatabase } from "./employee/EmployeeDatabase";
import { EmployeeRegisterT } from "./employee/Employee";
import { isLeft } from "fp-ts/Either";

const getEmployeeHandler = async (
  database: EmployeeDatabase,
  id: string
): Promise<LambdaFunctionURLResult> => {
  const employee: Employee | undefined = await database.getEmployee(id);
  if (employee == null) {
    console.log("A user is not found.");
    return { statusCode: 404 };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(employee),
  };
};

const getEmployeesHandler = async (
  database: EmployeeDatabase,
  filterText: string,
  affiliation: string,
  position: string
): Promise<LambdaFunctionURLResult> => {
  const employees: Employee[] = await database.getEmployees(
    filterText,
    affiliation,
    position
  );
  return {
    statusCode: 200,
    body: JSON.stringify(employees),
  };
};

const postEmployeeRegisterHandler = async (
  database: EmployeeDatabase,
  employee: EmployeeRegister
): Promise<LambdaFunctionURLResult> => {
  const decoded = EmployeeRegisterT.decode(employee);
  if (isLeft(decoded)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Invalid employee register data: ${JSON.stringify(employee)}`,
      }),
    };
  }
  try {
    const result = await database.saveEmployee(decoded.right);
    return {
      statusCode: 201,
      body: JSON.stringify(result),
    };
  } catch (e) {
    console.error("Failed to register the employee.", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

export const handle = async (
  event: LambdaFunctionURLEvent
): Promise<LambdaFunctionURLResult> => {
  console.log("event", event);
  try {
    const tableName = process.env.EMPLOYEE_TABLE_NAME;
    if (tableName == null) {
      throw new Error(
        "The environment variable EMPLOYEE_TABLE_NAME is not specified."
      );
    }
    const client = new DynamoDBClient();
    const database = new EmployeeDatabaseDynamoDB(client, tableName);
    // https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/urls-invocation.html
    const path = normalizePath(event.requestContext.http.path);
    const query = event.queryStringParameters;
    if (path === "/api/employees") {
      return getEmployeesHandler(
        database,
        query?.filterText ?? "",
        query?.affiliation ?? "",
        query?.position ?? ""
      );
    } else if (path === "/api/employees/register") {
      const body = JSON.parse(event.body ?? "{}");
      return postEmployeeRegisterHandler(database, body);
    } else if (path.startsWith("/api/employees/")) {
      const id = path.substring("/api/employees/".length);
      return getEmployeeHandler(database, id);
    } else {
      console.log("Invalid path", path);
      return { statusCode: 400 };
    }
  } catch (e) {
    console.error("Internal Server Error", e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
      }),
    };
  }
};

function normalizePath(path: string): string {
  return path.endsWith("/") ? path.slice(0, -1) : path;
}
