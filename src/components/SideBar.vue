<script setup>
  import { RouterLink } from 'vue-router';
  import { computed } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  const auth = useAuthStore()
  const userId = computed(() => auth.userId);
</script>

<template>
  <aside>
    <h3 class="text-xl text-white font-bold mb-4 whitespace-nowrap">Menú</h3>
    <ul class="text-gray-300">
      <li><RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Inicio</RouterLink></li>
      <li><RouterLink to="/sales" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Ofertas</RouterLink></li>
      <li><RouterLink to="/catalog" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Nuevos lanzamientos</RouterLink></li>
      <li><RouterLink to="/catalog" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Más vendidos</RouterLink></li>
      <li class="pt-4 mt-4 border-t border-gray-700"></li>
      <li><RouterLink to="/orders" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Mis compras</RouterLink></li>
      <li><RouterLink :to="`/profile/${userId}`" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Mi cuenta</RouterLink></li>
      
      <li class="pt-4 mt-4 border-t border-gray-700 whitespace-nowrap">
          <h4 class="font-semibold">Categorías</h4>
          <ul class="mt-2 space-y-1 ml-2">
              <li><RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Acción</RouterLink></li>
              <li><RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Aventura</RouterLink></li>
              <li><RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">RPG</RouterLink></li>
              <li><RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Estrategia</RouterLink></li>
          </ul>
        </li>

      <li class="pt-4 mt-4 border-t border-gray-700"></li>
      <li><RouterLink to="/dashboard" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Panel de ventas</RouterLink></li>
      <li><RouterLink to="/dashboard/sell" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Vender</RouterLink></li>
      <li class="pt-4 mt-4 border-t border-gray-700"></li>
      <li><RouterLink to="/admin" class="block hover:bg-gray-700 p-2 rounded whitespace-nowrap">Acerca de</RouterLink></li>
    </ul>
  </aside>
</template>