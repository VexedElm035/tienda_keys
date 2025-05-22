<script setup>
import GameCard from '../components/GameCard.vue';
import KeyCard from '@/components/KeyCard.vue';
import FeaturedCarrousel from '../components/FeaturedCarrousel.vue';
import axios from 'axios';
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

let games = ref([]);
let keys = ref([]);
let genres = ref([]);
const abortController = ref(null);

async function fetchData() {
  try {
    // Cancel any pending requests
    if (abortController.value) {
      abortController.value.abort();
    }
    
    abortController.value = new AbortController();
    
    // Parallel requests
    const [gamesRes, keysRes, genresRes] = await Promise.all([
      axios.get('/games', { signal: abortController.value.signal }),
      axios.get('/gamekeys', { signal: abortController.value.signal }),
      axios.get('/genres', { signal: abortController.value.signal })
    ]);
    
    games.value = gamesRes.data;
    keys.value = keysRes.data.filter(key => key.state === 'disponible');
    genres.value = genresRes.data;
  } catch (err) {
    if (!axios.isCancel(err)) {
      console.error('Error fetching data:', err);
    }
  }
}

onMounted(() => {
  fetchData();
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
                <div v-for="genre in genres.slice(0,2)" :key="genre.id" >
                    <button class="bg-yellow-500 text-gray-900 uppercase px-4 py-2 rounded-lg hover:bg-yellow-400">{{genre.name}}</button>
                </div> 
            </div>
        </section>  

        <section class="container mx-auto p-6 flex-grow">
            <h2 class="text-2xl font-bold text-center mb-6">Juegos Destacados</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="game in games" :key="game.id">
                    <GameCard
                        :id="game.id"
                        :title="game.name"
                        :img="game.img"
                    />
                </div>
            </div>
        </section>
        <section class="container mx-auto p-6 flex-grow">
            <h2 class="text-2xl font-bold text-center mb-6">Llaves Destacadas</h2>
            <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div v-for="key in keys" :key="key.id">
                    <KeyCard
                        :id="key.id"
                        :name="key.game.name"
                        :price="key.price"
                        :platform="key.platform"
                        :region="key.region"
                        :seller="key.seller"
                        :img="key.game.img"
                        :rate="key.rate"
                        :deliverytime="key.delivery_time"
                    />
                </div>
            </div>
        </section>
    </section>
</template>

