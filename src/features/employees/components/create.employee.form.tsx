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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useCreateEmployee } from '../hooks/useEmployees'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const DEPARTMENTS = ['IT', 'Marketing', 'Product', 'Sales'] as const

const createEmployeeSchema = z.object({
    firstName:          z.string().min(1, 'First name is required'),
    lastName:           z.string().min(1, 'Last name is required'),
    registrationNumber: z.coerce.number({ error: 'Must be a valid number' }).positive('Must be positive'),
    email:              z.string().email('Invalid email address'),
    dateOfBirth:        z.string().min(1, 'Date of birth is required'),
    gender:             z.enum(['male', 'female'], { error: 'Gender is required' }),
    jobTitle:           z.string().min(1, 'Job title is required'),
    department:         z.enum(DEPARTMENTS, { error: 'Department is required' }),
})

type CreateEmployeeFormValues = z.infer<typeof createEmployeeSchema>

interface CreateEmployeeModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CreateEmployeeModal({ open, onOpenChange }: CreateEmployeeModalProps) {
    const { mutate: createEmployee, isPending } = useCreateEmployee()

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateEmployeeFormValues>({
        resolver: zodResolver(createEmployeeSchema),
    })

    function onSubmit(values: CreateEmployeeFormValues) {
        createEmployee(values, {
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
                    <DialogTitle>Add Employee</DialogTitle>
                </DialogHeader>

                <form
                    id="create-employee-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 overflow-y-auto py-2 text-sm"
                >
                    {/* First name + Last name */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="firstName">First name</Label>
                            <Input id="firstName" placeholder="John" {...register('firstName')} />
                            {errors.firstName && (
                                <p className="text-destructive text-xs">{errors.firstName.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input id="lastName" placeholder="Doe" {...register('lastName')} />
                            {errors.lastName && (
                                <p className="text-destructive text-xs">{errors.lastName.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Registration number */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="registrationNumber">Registration number</Label>
                        <Input id="registrationNumber" placeholder="12345" {...register('registrationNumber')} />
                        {errors.registrationNumber && (
                            <p className="text-destructive text-xs">{errors.registrationNumber.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john.doe@company.com" {...register('email')} />
                        {errors.email && (
                            <p className="text-destructive text-xs">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Date of birth + Gender */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="dateOfBirth">Date of birth</Label>
                            <Input id="dateOfBirth" type="date" {...register('dateOfBirth')} />
                            {errors.dateOfBirth && (
                                <p className="text-destructive text-xs">{errors.dateOfBirth.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Controller
                                control={control}
                                name="gender"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="gender" className="w-full">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.gender && (
                                <p className="text-destructive text-xs">{errors.gender.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Job title + Department */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="jobTitle">Job title</Label>
                            <Input id="jobTitle" placeholder="Software Engineer" {...register('jobTitle')} />
                            {errors.jobTitle && (
                                <p className="text-destructive text-xs">{errors.jobTitle.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="department">Department</Label>
                            <Controller
                                control={control}
                                name="department"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="department" className="w-full">
                                            <SelectValue placeholder="Select department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {DEPARTMENTS.map(dept => (
                                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.department && (
                                <p className="text-destructive text-xs">{errors.department.message}</p>
                            )}
                        </div>
                    </div>
                </form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isPending}>Cancel</Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        form="create-employee-form"
                        disabled={isPending}
                    >
                        {isPending ? 'Creating...' : 'Create Employee'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}