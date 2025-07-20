import * as t from "io-ts";
import { SkillT } from "./Skill";

export const EmployeeT = t.type({
  id: t.string,
  name: t.string,
  age: t.number,
  affiliation: t.string,
  position: t.string,
  skills: t.array(SkillT),
});

export type Employee = t.TypeOf<typeof EmployeeT>;
