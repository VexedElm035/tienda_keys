import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth',
  () => {
    const isLoggedIn = ref(false)
    const userId = ref('')
    const userName = ref('')
    const userRole = ref('') // 'admin', 'seller' o 'user'
    const token = ref('')
    const avatar = ref('')

    function login(user, id, role) {
      isLoggedIn.value = true
      userName.value = user
      userId.value = id
      userRole.value = role
    }

    function setRole(role) {
      userRole.value = role
    }

    async function logout() { 
      isLoggedIn.value = false
      userName.value = ''
      userId.value = ''
      userRole.value = ''
      token.value = ''
      avatar.value = ''
      await axios.post('../logout')
    }

    return { 
      isLoggedIn, 
      userName, 
      userId, 
      userRole, // Exportamos el rol
      token, 
      avatar,
      login, 
      logout,
      setRole
    }
  },
  {
    persist: true
  }
)