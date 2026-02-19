import { useState } from "react"
import { useAllEmployees,  } from "@/features/employees/hooks/useEmployees"
import { TableSkeleton } from "@/components/table.skeleton"
import { EmployeesTable } from "@/features/employees/components/employees.table"
import { CreateEmployeeModal } from "@/features/employees/components/create.employee.form"
import { UpdateEmployeeModal } from "@/features/employees/components/update.employee.form"
import { DeleteEmployeeDialog } from "@/features/employees/components/delete.employee.dialog"
import type { Employee } from "@/features/employees/types/employees.types"

export function EmployeesPage() {
    const {data, isLoading, isError, error} = useAllEmployees()
    const [createOpen, setCreateOpen] = useState(false)
    const [updateOpen, setUpdateOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

    if (isLoading) return <TableSkeleton />
    if (isError) return <div>Error {error.message}</div>
  return (
        <>
            <EmployeesTable 
                data={data} 
                onAdd={() => setCreateOpen(true)}
                onEdit={(employee)=>{
                    setSelectedEmployee(employee)
                    setUpdateOpen(true)
                }} 
                onDelete={(employee)=> {
                    setSelectedEmployee(employee)
                    setDeleteOpen(true)
                }} 
            />

            <CreateEmployeeModal
                open={createOpen}
                onOpenChange={setCreateOpen}
            />
            <UpdateEmployeeModal 
                open={updateOpen}
                onOpenChange={setUpdateOpen}
                employee={selectedEmployee}
            />
            <DeleteEmployeeDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                employee={selectedEmployee}
            />
        </>
    )
}

