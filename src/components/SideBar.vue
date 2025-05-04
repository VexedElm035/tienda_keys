<script setup>
    import { RouterLink } from 'vue-router';
    import { defineProps } from 'vue';
    const props = defineProps({ isVisible: Boolean });
</script>

<template>
    <aside :class="[
  'bg-gray-800 w-64 p-4 fixed top-0 left-0 min-h-full z-50 transition-all duration-300 ease-in-out',
  isVisible ? 'translate-x-0 opacity-100 visible pointer-events-auto' : '-translate-x-full opacity-0 invisible pointer-events-none'
]">
  
<button
  @click="$emit('toggle-menu')"
  class="text-white focus:outline-none mb-4"
>
<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
</button>
      <h3 class="text-xl text-white font-bold mb-4">Menú</h3>
      <ul class="text-gray-300">
        <li><RouterLink to="/" class="block hover:bg-gray-700 p-2 roun ded">Inicio</RouterLink></li>
        <li><RouterLink to="/sales" class="block hover:bg-gray-700 p-2 rounded">Ofertas</RouterLink></li>
        <li><RouterLink to="/catalog" class="block hover:bg-gray-700 p-2 rounded">Nuevos lanzamientos</RouterLink></li>
        <li><RouterLink to="/catalog" class="block hover:bg-gray-700 p-2 rounded">Más vendidos</RouterLink></li>
        <li class="pt-4 mt-4 border-t border-gray-700"></li>
        <li><RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded">Mis compras</RouterLink></li>
        <li><RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded">Favoritos</RouterLink></li>
        <li><RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded">Cupones</RouterLink></li>
        <li><RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded">Mi cuenta</RouterLink></li>
        
        <li class="pt-4 mt-4 border-t border-gray-700">
            <h4 class="font-semibold">Categorías</h4>
            <ul class="mt-2 space-y-1 ml-2">
                <li><RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded">Acción</RouterLink></li>
                <li><RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded">Aventura</RouterLink></li>
                <li><RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded">RPG</RouterLink></li>
                <li><RouterLink to="/" class="block hover:bg-gray-700 p-2 rounded">Estrategia</RouterLink></li>
            </ul>
         </li>

        <li class="pt-4 mt-4 border-t border-gray-700"></li>
        <li><RouterLink to="/dashboard" class="block hover:bg-gray-700 p-2 rounded">Panel de ventas</RouterLink></li>
        <li><RouterLink to="/dashboard/sell" class="block hover:bg-gray-700 p-2 rounded">Vender</RouterLink></li>
        <li class="pt-4 mt-4 border-t border-gray-700"></li>
        <li><RouterLink to="/admin" class="block hover:bg-gray-700 p-2 rounded">Acerca de</RouterLink></li>
      </ul>
    </aside>
</template> 