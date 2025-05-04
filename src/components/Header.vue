<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import axios from 'axios'

const props = defineProps({
  hasSidebar: {
    type: Boolean,
    default: true
  }
})

const auth = useAuthStore()
const userId = computed(() => auth.userId);

const router = useRouter()
const showMenu = ref(false)
const id = 1

function toggleMenu() {
  showMenu.value = !showMenu.value
}

function logout() {
  auth.logout()
  router.push('/login')
  showMenu.value = false
}
</script>

<template>
  <header class="bg-gray-800 p-4 flex justify-between items-center relative">
    <!-- Solo muestra el botón si tiene sidebar -->
    <button v-if="hasSidebar" @click="$emit('toggle-menu')" class="text-white focus:outline-none">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>

    <RouterLink to="/" class="text-2xl text-white font-bold">GameKeys</RouterLink>

    <nav>
      <ul class="flex gap-4 items-center relative">
        <li><RouterLink to="/" class="text-gray-300 hover:text-yellow-400">Tienda</RouterLink></li>
        <li><RouterLink to="/cart" class="text-gray-300 hover:text-yellow-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z"></path>
          </svg>

        </RouterLink></li>

        <template v-if="!auth.isLoggedIn">
          <li><RouterLink to="/login" class="text-gray-300 hover:text-yellow-400">Iniciar Sesión</RouterLink></li>
          <li><RouterLink to="/signup" class="text-gray-300 hover:text-yellow-400">Registrarse</RouterLink></li>
        </template>

        <template v-else>
          <li class="relative">
            <button @click="toggleMenu" class="text-gray-300 hover:text-yellow-400 focus:outline-none">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4
                         v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </button>
            
            <ul
              v-if="showMenu"
              class="absolute right-0 mt-2 w-48 bg-gray-700 text-white rounded-lg shadow-lg z-50"
            >
              <li>
                <RouterLink :to="`/profile/${userId}`" class="block px-4 py-2 hover:bg-gray-600">Perfil</RouterLink>
              </li>
              <li>
                <RouterLink to="/orders" class="block px-4 py-2 hover:bg-gray-600">Historial de pedidos</RouterLink>
              </li>
              <li>
                <button @click="logout" class="block w-full text-left px-4 py-2 hover:bg-gray-600">
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>
