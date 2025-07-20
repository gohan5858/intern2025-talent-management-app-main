import express, { Request, Response } from "express";
import { EmployeeDatabaseInMemory } from "./employee/EmployeeDatabaseInMemory";
import { isValidQueryString } from "./utils/validator";
import { ParsedQs } from "qs";
import { SortMethod } from "./types/SortMethod";

const app = express();
const port = process.env.PORT ?? 8080;
const database = new EmployeeDatabaseInMemory();

app.get("/api/employees", async (req: Request, res: Response) => {
  const filterText = req.query.filterText ?? "";
  const affiliation = req.query.affiliation ?? "";
  const position = req.query.position ?? "";
  const viewMode = req.query.viewMode ?? "";
  const sortMethod =
    (req.query.sortMethod as SortMethod) ?? ("default" as SortMethod);
  const parsePageNo = (
    value: string | ParsedQs | (string | ParsedQs)[] | undefined
  ): number => {
    if (typeof value === "string") {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? 1 : parsed;
    }
    return 1;
  };

  const pageNo = parsePageNo(req.query.pageNo);

  if (
    !isValidQueryString(filterText) ||
    !isValidQueryString(affiliation) ||
    !isValidQueryString(position) ||
    !isValidQueryString(viewMode)
  ) {
    res.status(400).send();
    return;
  }

  try {
    const employees = await database.getEmployees(
      filterText,
      affiliation,
      position,
      viewMode,
      sortMethod,
      pageNo
    );
    res.status(200).send(JSON.stringify(employees));
  } catch (e) {
    console.error(`Failed to load the users filtered by ${filterText}.`, e);
    res.status(500).send();
  }
});

app.get("/api/employees/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const employee = await database.getEmployee(userId);
    if (employee == undefined) {
      res.status(404).send();
      return;
    }
    res.status(200).send(JSON.stringify(employee));
  } catch (e) {
    console.error(`Failed to load the user ${userId}.`, e);
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`App listening on the port ${port}`);
});
