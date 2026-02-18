import type {
    CreateEmployeeRequest,
    UpdateEmployeeRequest,
} from '../types/employees.requests'

import type { Employee } from '../types/employees.types';

import { fetcher } from '@/lib/api';

const BASE_URL = 'https://69944054fade7a9ec0f4c5fe.mockapi.io/api/v1'
const ENDPOINTS = {
    employees: `${BASE_URL}/employees`,
} as const



export const getAllEmployees = (): Promise<Employee[]> =>
    fetcher(ENDPOINTS.employees)

export const getEmployeeById = (id: string): Promise<Employee> =>
    fetcher(`${ENDPOINTS.employees}/${id}`)


export const createEmployee = (data: CreateEmployeeRequest): Promise<Employee> =>
    fetcher(ENDPOINTS.employees, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })


export const updateEmployee = (id: string, data: UpdateEmployeeRequest): Promise<Employee> =>
    fetcher(`${ENDPOINTS.employees}/${id}`,
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
    )


export const deleteEmployee = (id: string): Promise<Employee> =>
    fetcher(`${ENDPOINTS.employees}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })




