import { DataTable } from "@/components/data-table"

import data from "./data.json"

export function DocumentsPage() {
  return   <DataTable data={data} />
}