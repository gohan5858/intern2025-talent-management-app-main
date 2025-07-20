import * as t from 'io-ts';

export const EmployeeT = t.type({
    id: t.string,
    name: t.string,
    age: t.number,
    affiliation: t.string,
    position: t.string,
});

export type Employee = t.TypeOf<typeof EmployeeT>;

export const EmployeeRegisterT = t.type({
    name: t.string,
    age: t.number,
    affiliation: t.string,
    position: t.string,
});

export type EmployeeRegister = t.TypeOf<typeof EmployeeRegisterT>;
