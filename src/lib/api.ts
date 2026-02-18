import type { ApiError } from "@/types/api.types"

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, options)
    if (!res.ok) {
        let message = `Request failed (${res.status})`
        try {
            const errData = await res.json()
            if (errData?.message) message = errData.message
        } catch { }
        throw { message, status: res.status } as ApiError
    }
    return res.json()
}