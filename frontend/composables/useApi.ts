import type { ApiResponse } from '~/types/api'

export const useApi = () => {
  const config = useRuntimeConfig()
  const token = useCookie('token')

  const fetch = async <T>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
      body?: any
      headers?: Record<string, string>
    } = {}
  ): Promise<ApiResponse<T>> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers
    }

    if (token.value) {
      headers['Authorization'] = `Bearer ${token.value}`
    }

    try {
      const response = await $fetch<ApiResponse<T>>(`${config.public.apiBase}${endpoint}`, {
        method: options.method || 'GET',
        body: options.body,
        headers
      })

      return response
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred')
    }
  }

  return {
    fetch
  }
} 