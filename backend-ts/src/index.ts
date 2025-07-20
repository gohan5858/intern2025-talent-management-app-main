import express, { Request, Response } from "express";
import { EmployeeDatabaseInMemory } from './employee/EmployeeDatabaseInMemory';
import {isValidQueryString} from "./utils/validator";
import { EmployeeRegisterT } from "./employee/Employee";
import { isLeft } from "fp-ts/Either";

const app = express();
const port = process.env.PORT ?? 8080;
const database = new EmployeeDatabaseInMemory();

app.get("/api/employees", async (req: Request, res: Response) => {
    const filterText = req.query.filterText ?? "";
    const affiliation = req.query.affiliation ?? "";
    const position = req.query.position ?? "";

    if (!isValidQueryString(filterText) || !isValidQueryString(affiliation) || !isValidQueryString(position)) {
        res.status(400).send();
        return;
    }

    try {
        const employees = await database.getEmployees(filterText, affiliation, position);
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

app.post("/api/employees/register", express.json(), async (req: Request, res: Response) => {
    const employeeRegister = EmployeeRegisterT.decode(req.body);
    if (isLeft(employeeRegister)) {
        res.status(400).send({ message: `Invalid employee register data: ${JSON.stringify(req.body)}` });
        return;
    }

    try {
        const result = await database.saveEmployee(employeeRegister.right);
        res.status(201).send(JSON.stringify(result));
    } catch (e) {
        console.error("Failed to register the employee.", e);
        res.status(500).send();
    }
});

app.listen(port, () => {
    console.log(`App listening on the port ${port}`);
});
