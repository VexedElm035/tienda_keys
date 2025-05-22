<script setup>
    import { RouterLink } from 'vue-router';
    defineProps(['id','title', 'price', 'img'])

</script>

<template>
    <div class="bg-gray-800 p-4 rounded-lg text-center">
        <img :src="`${$img_url}/${img}`"  alt="Juego" class="max-w-48 h-64 object-cover mx-auto mb-3 rounded-lg">
        <h3 class="text-xl font-bold">{{title}}</h3>
        <!-- <p class="text-yellow-400 text-lg">{{price}}</p> -->
        <!-- <button class="mt-2 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400">Añadir al Carrito</button> -->
        <RouterLink :to="`/game/${id}`"  class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400">Detalles</RouterLink>
    </div>
</template>