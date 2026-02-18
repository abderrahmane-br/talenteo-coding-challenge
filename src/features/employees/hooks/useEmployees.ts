import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from '../api/employees.api'
import type { Employee } from '../types/employees.types'
import type { ApiError } from '@/types/api.types'
import type { CreateEmployeeRequest, UpdateEmployeeRequest } from '../types/employees.requests'


export const employeeKeys = {
    all: ['employees'] as const,
    lists: () => [...employeeKeys.all, 'list'] as const,
    detail: (id: string) => [...employeeKeys.all, 'detail', id] as const,
}


export function useAllEmployees() {
    return useQuery<Employee[], ApiError>({
        queryKey: employeeKeys.lists(),
        queryFn: getAllEmployees,
    })
}


export function useEmployee(id: string) {
    return useQuery<Employee, ApiError>({
        queryKey: employeeKeys.detail(id),
        queryFn: () => getEmployeeById(id),
        enabled: !!id
    })
}


export function useCreateEmployee() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateEmployeeRequest) =>
            createEmployee(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: employeeKeys.lists()
            })
        }

        // onError => add toast later
    })
}


export function useUpdateEmployee() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateEmployeeRequest }) =>
            updateEmployee(id, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: employeeKeys.lists(),
            })

            queryClient.invalidateQueries({
                queryKey: employeeKeys.detail(variables.id),
            })
        },
    })
}


export function useDeleteEmployee() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => deleteEmployee(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: employeeKeys.lists(),
            })
        },
    })
}

