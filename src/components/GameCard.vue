<script setup>
    import { RouterLink } from 'vue-router';
    defineProps(['id','title', 'price', 'img'])

</script>

<template>
    <RouterLink :to="`/game/${id}`">
    <div class="bg-gray-800 hover:bg-gray-700 p-1 rounded-lg text-center h-full w-full">
        <img :src="`${img}`"  alt="Juego" class="w-[85%] h-[73%] object-cover mx-auto mb-3 rounded-lg">
        <h3 class="text-lg font-bold">{{title}}</h3>
        <!-- <p class="text-yellow-400 text-lg">{{price}}</p> -->
        <!-- <button class="mt-2 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400">Añadir al Carrito</button> -->
         <div>
            <!-- <RouterLink :to="`/game/${id}`"  class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Detalles</RouterLink> -->

         </div>
    </div>
    </RouterLink>
</template>