import { useState } from "react"
import { useAllEmployees,  } from "@/features/employees/hooks/useEmployees"
import { EmployeesTable } from "@/features/employees/components/employees.table"
import { CreateEmployeeModal } from "@/features/employees/components/create.employee.form"

export function EmployeesPage() {
    const {data, isLoading, isError, error} = useAllEmployees()
    const [createOpen, setCreateOpen] = useState(false)
    const [updateOpen, setUpdateOpen] = useState(false)

    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error {error.message}</div>
  return (
            <EmployeesTable 
                data={data} 
                onAdd={() => setCreateOpen(true)}
            />

    )
}

