import { useUserStore } from '~/stores/user'
import type { ApiResponse } from '~/types/api'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface NuxtAppWithToast {
  $toast: {
    success: (msg: string) => void
    error: (msg: string) => void
  }
}

export const useAuth = () => {
  const userStore = useUserStore()
  const { $toast } = useNuxtApp() as unknown as NuxtAppWithToast
  const router = useRouter()
  const config = useRuntimeConfig()

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch(`${config.public.apiBase}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      const data: ApiResponse<{ token: string; user: any }> = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Login failed')
      }

      userStore.setToken(data.data.token)
      userStore.setUser(data.data.user)
      $toast.success('Login successful')
      router.push('/dashboard')
    } catch (error: any) {
      $toast.error(error.message || 'Login failed')
      throw error
    }
  }

  const register = async (data: RegisterData) => {
    try {
      const response = await fetch(`${config.public.apiBase}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result: ApiResponse<{ token: string; user: any }> = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Registration failed')
      }

      userStore.setToken(result.data.token)
      userStore.setUser(result.data.user)
      $toast.success('Registration successful')
      router.push('/dashboard')
    } catch (error: any) {
      $toast.error(error.message || 'Registration failed')
      throw error
    }
  }

  const logout = () => {
    userStore.logout()
    $toast.success('Logged out successfully')
    router.push('/login')
  }

  return {
    login,
    register,
    logout
  }
} 