import type { ApiError } from "@/types/api.types"

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    let res: Response

    try {
        res = await fetch(url, options)
    } catch {
        throw { message: 'Network error — please check your connection' } as ApiError
    }

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