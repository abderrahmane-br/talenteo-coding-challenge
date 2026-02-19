# Talenteo Frontend Coding Challenge — Employee Management

A React + TypeScript implementation of an Employee CRUD feature built on top of the provided starter project.

---

## Features Implemented

- ✅ Employee list with all required columns
- ✅ Avatar with initials fallback
- ✅ Add employee modal with form validation and list updating
- ✅ Edit employee modal (job title only, per API constraint) and list updating
- ✅ Delete employee with confirmation dialog and list updating
- ✅ Loading skeleton while fetching
- ✅ Multilevel error handling
- ✅ Toast notifications for all mutations (success + error)
- ✅ Shared layout across routes


## What I have added to the Tech Stack

| Library | Purpose |
|---|---|
| React Router v7 | Client-side routing |
| TanStack Query v5 | Server state management |
| React Hook Form + Zod | Form handling and validation |
| shadcn/ui | Component library |


---

## Project Structure, what changed?

Separated Data-table from general app layout

```
src/
├── components/               # 
│   ├── ui/                   # shadcn primitives — added some
│   ├── app-layout.tsx        # Sidebar + header shell via React Router Outlet
│   ├── app-sidebar.tsx       # Navigation sidebar (modified)
│   ├── site-header.tsx       # Top header with dynamic page title
│   ├── nav-main.tsx          # Primary nav links with active state
│   ├── nav-secondary.tsx     # Secondary nav links
│   ├── nav-user.tsx          # 
│   └── table-skeleton.tsx    # Generic loading skeleton for tables
│
├── features/
│   └── employees/            # Self-contained employee feature
│       ├── api/
│       │   └── employees.api.ts        # Fetch wrappers for all CRUD endpoints
│       ├── components/
│       │   ├── columns.tsx             # TanStack Table column definitions
│       │   ├── EmployeeTable.tsx       # Table with toolbar, pagination
│       │   ├── CreateEmployeeModal.tsx # Add employee dialog + form
│       │   ├── UpdateEmployeeModal.tsx # Edit employee dialog + form
│       │   └── DeleteEmployeeDialog.tsx # Confirmation dialog
│       ├── hooks/
│       │   └── useEmployees.ts         # React Query hooks
│       └── types/
│           ├── employees.types.ts      # Employee interface
│           └── employees.requests.ts   # Request types (Create, Update)
│
├── lib/
│   ├── api.ts                # Global fetchAPI wrapper 
│   └── utils.ts              
│
├── pages/
│   ├── documents.page.tsx    # Existing documents page
│   └── employees.page.tsx    # employees  page 
│
├── types/
│   └── api.types.ts          # Shared ApiError type
│
├── App.tsx                   # Routes
└── main.tsx                  # Entry point
```

---

## Architecture Decisions

### Feature-based structure
The employees feature is fully self-contained under `src/features/employees/`. All API calls, hooks, components, and types related to employees live together. This makes the feature easy to reason about, test, and remove independently of the rest of the app.

### Shared vs feature-specific components
Components in `src/components/` are genuinely reusable across features — layout, navigation, the table skeleton.

### Global API wrapper
All fetch calls go through a single `fetchAPI` utility in `src/lib/api.ts` that handles network errors, non-ok responses, and error shaping into a consistent `ApiError` type.

### TanStack Query for server state
React Query handles all loading states, error states, and cache invalidation. After any mutation (create, update, delete), the employee list is automatically invalidated and refetched — no manual state updates needed. Success and error toasts are fired from the mutation hooks, not from components.

### Single form modal pattern
Add and Edit use separate modal components since the forms differ significantly — the create form has all fields editable, while the update form only allows editing `jobTitle` (per API constraint) and shows other fields as read-only for context.

### Client-side pagination
The API supports server-side pagination via `page` and `limit` query params, but client-side pagination via TanStack Table was chosen for this implementation. The dataset from the mock API is small, and server-side pagination would require working around MockAPI's limitation of not returning a total count — making true last-page detection impossible. Client-side pagination is the appropriate tradeoff at this scale.

> For a production dataset of thousands of records, server-side pagination with a `page`/`limit` approach and `hasNextPage` derived from response length would be the correct approach.


---

## Out of Scope

Given the scope of the challenge and the size of mock API, I left out many production-grade improvements that could've take place in a larger instance:
- *Abstraction:* first I thought of extracting a generic DataTable component and reimplmenting the documents section as another feature with the same archi, but the original DataTable file was large and tightly coupled, so I left it as is and only separated it from navigation and layout.
- *Optimization*: optimistic updates and virtualization weren't necessary for the size of the data and the project.
## Running the Project

```bash
npm install
npm run dev
```

Navigate to `http://localhost:5173/employees` to view the Employee Management page.

---

## API

The mock API is provided by MockAPI:

```
Base URL: https://69944054fade7a9ec0f4c5fe.mockapi.io/api/v1
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/employees` | List all employees |
| POST | `/employees` | Create a new employee |
| PATCH | `/employees/:id` | Update an employee (jobTitle only) |
| DELETE | `/employees/:id` | Delete an employee |

> **Note:** The API has a typo in the field name — `registratonNumber` (missing the `i`). This is reflected in the `Employee` type to match the actual API response.

---

