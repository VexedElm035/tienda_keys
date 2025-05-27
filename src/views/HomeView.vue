<script setup>
import GameCard from '../components/GameCard.vue';
import KeyCard from '@/components/KeyCard.vue';
import FeaturedCarrousel from '../components/FeaturedCarrousel.vue';
import HorizontalCarousel from '@/components/Carrousel.vue';
import axios from 'axios';
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

let games = ref([]);
let keys = ref([]);
let genres = ref([]);
const isLoading = ref(true);
const isLoadingKeys = ref(true); // Estado separado para keys
const abortController = ref(null);

async function fetchData() {
    try {
        isLoading.value = true;
        isLoadingKeys.value = true;

        if (abortController.value) {
            abortController.value.abort();
        }

        abortController.value = new AbortController();

        const [gamesRes, keysRes, genresRes] = await Promise.all([
            axios.get('/games', { signal: abortController.value.signal }),
            axios.get('/gamekeys', { signal: abortController.value.signal }),
            axios.get('/genres', { signal: abortController.value.signal })
        ]);

        games.value = gamesRes.data.slice(0, 6);
        keys.value = keysRes.data.filter(key => key.state === 'disponible').slice(0, 8); // Limitar keys también
        genres.value = genresRes.data;
    } catch (err) {
        if (!axios.isCancel(err)) {
            console.error('Error fetching data:', err);
        }
    } finally {
        isLoading.value = false;
        isLoadingKeys.value = false;
    }
}

onMounted(() => {
    fetchData();
});

onUnmounted(() => {
    if (abortController.value) {
        abortController.value.abort();
    }
});
</script>

<template>
    <section class="bg-gray-900 text-white flex flex-col min-h-screen flex-1">
        <section class="bg-yellow-500 text-center py-10">
            <h2 class="text-2xl font-bold">Ofertas Especiales en Juegos Digitales</h2>
        </section>
        <section class="container mx-auto p-6">
            <input type="text" placeholder="Buscar juegos..." class="w-full p-2 rounded-lg text-gray-100 bg-gray-700">
        </section>

        <FeaturedCarrousel />

        <section class="container mx-auto p-6 flex flex-col items-center">
            <h2 class="text-2xl font-bold text-center">Categorías</h2>
            <div class="flex max-w-[100%] gap-4 pt-4 pb-4 justify-center">
                <div v-for="genre in genres.slice(0, 2)" :key="genre.id">
                    <button
                        class="bg-yellow-500 text-gray-900 uppercase px-4 py-2 rounded-lg hover:bg-yellow-400">{{ genre.name }}</button>
                </div>
            </div>
        </section>

        <!-- Carrusel de Juegos -->
        <section class="container mx-auto p-6 flex-grow">
            <h2 class="text-2xl font-bold text-center mb-6">Juegos Destacados</h2>
            <HorizontalCarousel :items="games" :loading="isLoading" placeholder-type="game">
                <template #default="{ items }">
                    <div v-for="game in items" :key="game.id" class="flex-shrink-0 w-64">
                        <GameCard :id="game.id" :title="game.name" :img="game.img" />
                    </div>
                </template>
            </HorizontalCarousel>
        </section>

        <!-- Carrusel de Keys -->
        <section class="container mx-auto p-6 flex-grow">
            <h2 class="text-2xl font-bold text-center mb-6">Llaves Destacadas</h2>
            <HorizontalCarousel :items="keys" :loading="isLoadingKeys" placeholder-type="key">
                <template #default="{ items }">
                    <div v-for="key in items" :key="key.id" class="flex-shrink-0 w-48">
                        <KeyCard :id="key.id" :name="key.game.name" :price="key.price" :platform="key.platform"
                            :region="key.region" :seller="key.seller" :img="key.game.img" :rate="key.rate"
                            :deliverytime="key.delivery_time" />
                    </div>
                </template>
            </HorizontalCarousel>
        </section>
    </section>
</template>

<style>
/* Ocultar scrollbar pero mantener funcionalidad */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* Animación personalizada para placeholders */
@keyframes shimmer {
    0% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: shimmer 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>