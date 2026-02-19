import type { Employee } from "./employees.types";


// GET
// export type GetEmployeeResponse = Employee[]


// POST
export type CreateEmployeeRequest = Omit<Employee, 'id' | 'createdAt'>
// export type CreateEmployeeResponse = Employee


// PATCH
export type UpdateEmployeeRequest = Pick<Employee, 'jobTitle'>
// export type UpdateEmployeeResponse = Employee


// Delete
// export interface DeleteEmployeeRequest { id: string }
// export type DeleteEmployeeResponse = Employee

