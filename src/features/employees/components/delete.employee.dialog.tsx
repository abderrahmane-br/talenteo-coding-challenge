import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useDeleteEmployee } from '../hooks/useEmployees'
import type { Employee } from '../types/employees.types'

interface DeleteEmployeeDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    employee: Employee | null
}

export function DeleteEmployeeDialog({ open, onOpenChange, employee }: DeleteEmployeeDialogProps) {
    const { mutate: deleteEmployee, isPending } = useDeleteEmployee()

    function handleConfirm() {
        if (!employee) return
        deleteEmployee(employee.id, {
            onSuccess: () => onOpenChange(false),
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete{' '}
                        <span className="text-foreground font-medium">
                            {employee?.firstName}  {employee?.lastName}
                        </span> ? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            
                            onClick={handleConfirm}
                            disabled={isPending}
                            className="bg-destructive/80 text-background hover:bg-destructive/85"
                        >
                            {isPending ? 'Deleting...' : 'Delete'}
                        </Button>

                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}