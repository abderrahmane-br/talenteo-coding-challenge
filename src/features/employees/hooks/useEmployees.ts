import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import {
    getAllEmployees,
    // getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from '../api/employees.api'
import type { Employee } from '../types/employees.types'
import type { ApiError } from '@/types/api.types'
import type { CreateEmployeeRequest, UpdateEmployeeRequest } from '../types/employees.requests'
import { toast } from 'sonner'


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


export function useCreateEmployee() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateEmployeeRequest) =>
            createEmployee(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: employeeKeys.lists()
            })
            toast.success('Employee added successfully')
        },

        onError: (error: ApiError) => {
            toast.error(error.message ?? 'Failed to add employee')
        },
    })
}


export function useUpdateEmployee() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateEmployeeRequest }) =>
            updateEmployee(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: employeeKeys.lists() })
            toast.success('Employee updated successfully')
        },

        onError: (error: ApiError) => {
            toast.error(error.message ?? 'Failed to update employee')
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
            toast.success("Employee deleted successfully")
        },

        onError: (error: ApiError) => {
            toast.error(error.message ?? 'Failed to delete employee')
        },
    })
}

