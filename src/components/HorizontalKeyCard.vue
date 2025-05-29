<script setup>
import { RouterLink } from 'vue-router';

defineProps(['id', 'price', 'seller', 'seller_img', 'rate', 'deliverytime']);
</script>

<template>
    <section class="container mx-auto p-6 flex-grow">
        <div class="gap-6">

            <div class="bg-gray-800 p-4 rounded-lg flex flex-row flex-wrap justify-between">
                <div>
                    <img :src="seller_img ? `${seller_img}` : '../img/def.jpg'" alt="Foto de perfil"
                        class="w-12 h-12 rounded-full object-cover">
                    {{ seller }}
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-yellow-400 text-lg">{{ price }}</span>
                </div>
                <div class="mt-3 flex gap-2">
                    <button
                        class="text-sm flex-1 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400 h-9">
                        Añadir al Carrito
                    </button>
                    <RouterLink :to="`/key/${id}`"
                        class="text-center text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 h-9">
                        Detalles
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>

</template>
