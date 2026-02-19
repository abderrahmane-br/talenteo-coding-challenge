import type { ColumnDef } from '@tanstack/react-table'
import type { Employee } from '../types/employees.types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IconManFilled, IconWomanFilled } from '@tabler/icons-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconDotsVertical } from '@tabler/icons-react'

interface ColumnActions {
    onEdit: (employee: Employee) => void
    onDelete: (employee: Employee) => void
}

export function getEmployeesColumns({ onEdit, onDelete }: ColumnActions): ColumnDef<Employee>[] {
    return [
        {
            id: 'name',
            header: 'Name',
            cell: ({ row }) => {
                const { firstName, lastName, avatar } = row.original
                const initials = `${firstName[0]}${lastName[0]}`.toUpperCase()
                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={avatar} alt={`${firstName} ${lastName}`} />
                            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{firstName} {lastName}</span>
                    </div>
                )
            },
        },
        {
            accessorKey: 'registratonNumber',
            header: 'Regist. number',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'dateOfBirth',
            header: 'Date of Birth',
            cell: ({ row }) => (new Date(row.original.dateOfBirth)).toLocaleDateString(undefined, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }),
        },
        {
            accessorKey: 'gender',
            header: 'Gender',
            cell: ({ row }) => {
                const gender = row.original.gender
                return (
                <Badge variant="outline" className="capitalize">
                    {gender === 'male' ? <IconManFilled fill='#3381ff' /> : <IconWomanFilled fill='#ff57c1' />}
                    {gender}
                </Badge>
            )},
        },
        {
            accessorKey: 'jobTitle',
            header: 'Job Title',
        },
        {
            accessorKey: 'department',
            header: 'Department',
            cell: ({ row }) => (
                <Badge variant="secondary">
                    {row.original.department}
                </Badge>
            ),
        },
        {
            id: 'actions',
            header: () => <span className="sr-only">Actions</span>,
            cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                    >
                        <IconDotsVertical />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem onClick={() => onEdit?.(row.original)}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={() => onDelete?.(row.original)}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
        },
    ]
}