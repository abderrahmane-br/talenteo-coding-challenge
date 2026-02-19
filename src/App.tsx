import { BrowserRouter, Routes, Route } from 'react-router'
import { AppLayout } from '@/components/app-layout'
import { DocumentsPage } from '@/pages/documents.page'
import { EmployeesPage } from '@/pages/employees.page'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/"          element={<DocumentsPage />} />
                    <Route path="/employees" element={<EmployeesPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
