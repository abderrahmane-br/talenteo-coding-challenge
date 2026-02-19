import { useAllEmployees,  } from "@/features/employees/hooks/useEmployees"
import { EmployeesTable } from "@/features/employees/components/employees.table"


export function EmployeesPage() {
    const {data, isLoading, isError, error} = useAllEmployees()

    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error {error.message}</div>
  return (
        <EmployeesTable data={data} onEdit={()=>{}} onDelete={()=>{}} onAdd={()=>{}}/>
    )
}

