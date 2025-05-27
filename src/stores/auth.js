import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth',
  () => {
    const isLoggedIn = ref(false)
    const userId = ref('')
    const userName = ref('')
    const token = ref('')
    const avatar = ref('')

    function login(user, id) {
      isLoggedIn.value = true
      userName.value = user
      userId.value = id
    }

    async function logout() { 
      isLoggedIn.value = false
      userName.value = ''
      userId.value = ''
      await axios.post('../logout')
    }

    return { isLoggedIn, userName, userId, token, login, logout , avatar}
  },
  {
    persist: true
  }
)
