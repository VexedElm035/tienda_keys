import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth',
  () => {
    const isLoggedIn = ref(false)
    const userId = ref('')
    const userName = ref('')
    const token = ref('')

    function login(user, id) {
      isLoggedIn.value = true
      userName.value = user
      userId.value = id
    }

    async function logout() {
      await axios.post('../logout')
      isLoggedIn.value = false
      userName.value = ''
      userId.value = ''
    }

    return { isLoggedIn, userName, userId, token, login, logout }
  },
  {
    persist: true
  }
)
