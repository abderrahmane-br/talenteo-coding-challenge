import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUpdateEmployee } from '../hooks/useEmployees'
import type { Employee } from '../types/employees.types'

const updateEmployeeSchema = z.object({
    jobTitle: z.string().min(1, 'Job title is required'),
})

type UpdateEmployeeFormValues = z.infer<typeof updateEmployeeSchema>

interface UpdateEmployeeModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    employee: Employee | null
}

export function UpdateEmployeeModal({ open, onOpenChange, employee }: UpdateEmployeeModalProps) {
    const { mutate: updateEmployee, isPending } = useUpdateEmployee()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateEmployeeFormValues>({
        resolver: zodResolver(updateEmployeeSchema),
    })

    const disabledInputClass = "disabled:opacity-70  bg-muted"

    // Prefill form when employee changes
    useEffect(() => {
        if (employee) reset({ jobTitle: employee.jobTitle })
    }, [employee, reset])

    function onSubmit(values: UpdateEmployeeFormValues) {
        if (!employee) return
        updateEmployee({ id: employee.id, data: values }, {
            onSuccess: () => {
                reset()
                onOpenChange(false)
            },
        })
    }

    function handleOpenChange(open: boolean) {
        if (!open) reset()
        onOpenChange(open)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Employee</DialogTitle>
                </DialogHeader>

                <form
                    id="update-employee-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 py-2 text-sm"
                >
                    {/* Read-only fields for context */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>First name</Label>
                            <Input value={employee?.firstName ?? ''} disabled className={disabledInputClass} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Last name</Label>
                            <Input value={employee?.lastName ?? ''} disabled className={disabledInputClass} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Email</Label>
                        <Input value={employee?.email ?? ''} disabled className={disabledInputClass} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Department</Label>
                            <Input value={employee?.department ?? ''} disabled className={disabledInputClass} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Gender</Label>
                            <Input value={employee?.gender ?? ''} disabled className={`${disabledInputClass} capitalize`} />
                        </div>
                    </div>

                    {/* Editable field */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="jobTitle">
                            Job title
                            <span className="text-muted-foreground ml-2 text-xs font-normal">(editable)</span>
                        </Label>
                        <Input
                            id="jobTitle"
                            placeholder="Software Engineer"
                            {...register('jobTitle')}
                        />
                        {errors.jobTitle && (
                            <p className="text-destructive text-xs">{errors.jobTitle.message}</p>
                        )}
                    </div>
                </form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isPending}>Cancel</Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        form="update-employee-form"
                        disabled={isPending}
                    >
                        {isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}