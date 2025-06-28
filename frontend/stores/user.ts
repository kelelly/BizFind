import { defineStore } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface UserState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    isAuthenticated: false,
    token: null
  }),

  getters: {
    currentUser: (state): User | null => state.user,
    isLoggedIn: (state): boolean => state.isAuthenticated
  },

  actions: {
    setUser(user: User) {
      this.user = user
      this.isAuthenticated = true
    },

    setToken(token: string) {
      this.token = token
      if (process.client) {
        localStorage.setItem('token', token)
      }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      this.token = null
      if (process.client) {
        localStorage.removeItem('token')
      }
    },

    async fetchUser() {
      try {
        const { $axios } = useNuxtApp()
        const response = await ($axios as any).get('/api/user/profile')
        this.setUser(response.data)
      } catch (error) {
        console.error('Error fetching user:', error)
        this.logout()
      }
    }
  },

  persist: true
}) 