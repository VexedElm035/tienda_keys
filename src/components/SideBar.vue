<script setup>
import { RouterLink } from 'vue-router';
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const userId = computed(() => auth.userId);
const isSeller = computed(() => auth.userRole === 'seller');
</script>

<template>
  <aside>
    <h3 class="text-xl text-white font-bold mb-4 whitespace-nowrap">Menú</h3>
    <ul class="text-gray-300">
      <li>
        <RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Inicio</RouterLink>
      </li>
      <li>
        <RouterLink to="/sales" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Ofertas</RouterLink>
      </li>
      <li>
        <RouterLink to="/catalog" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Catálogo</RouterLink>
      </li>
      <li class="pt-4 mt-4 border-t border-gray-700"></li>
      <li>
        <RouterLink to="/orders" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Mis compras</RouterLink>
      </li>
      <li>
        <RouterLink to="/inbox" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Mi buzón</RouterLink>
      </li>
      <li>
        <RouterLink :to="`/profile/${userId}`" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Mi cuenta
        </RouterLink>
      </li>

      <li class="pt-4 mt-4 border-t border-gray-700 whitespace-nowrap">
        <h4 class="font-semibold">Plataformas</h4>
        <ul class="mt-2 space-y-1 ml-2">
          <li>
            <RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Steam</RouterLink>
          </li>
          <li>
            <RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">PS4</RouterLink>
          </li>
          <li>
            <RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">PS5</RouterLink>
          </li>
          <li>
            <RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Xbox One</RouterLink>
          </li>
          <li>
            <RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Xbox Series X</RouterLink>
          </li>
          <li>
            <RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Nintendo Switch
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Epic Games</RouterLink>
          </li>
        </ul>
      </li>

      <li class="pt-4 mt-4 border-t border-gray-700"></li>

      <template v-if="isSeller">
        <li>
          <RouterLink to="/dashboard" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Panel de ventas
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/dashboard/sell" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Vender
          </RouterLink>
        </li>
        <li class="pt-4 mt-4 border-t border-gray-700"></li>
      </template>

    </ul>
  </aside>
</template>