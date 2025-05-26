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
const isLoading = ref(false);
const error = ref(null);

async function fetchIGDBGames() {
  try {
    isLoading.value = true;
    error.value = null;
    
    if (abortController.value) {
      abortController.value.abort();
    }
    
    abortController.value = new AbortController();
    
    const response = await axios.get('/igdb/games', {
      params: {
        limit: 6
      },
      signal: abortController.value.signal
    });
    
    // Transformar los datos de IGDB a tu formato
    games.value = response.data.map(game => {
      // Verificar si el juego ya tiene la estructura transformada (del backend)
      if (game.img && typeof game.img === 'string') {
        return game; // Si ya está transformado, lo usamos tal cual
      }
      
      // Si no, aplicamos la transformación
      return {
        id: game.id,
        name: game.name,
        img: game.cover 
          ? `https:${game.cover.url.replace('t_thumb', 't_cover_big')}` 
          : (game.cover_url || null), // Fallback por si acaso
        description: game.summary || game.description || 'Descripción no disponible',
        launch_date: game.first_release_date 
          ? (typeof game.first_release_date === 'string' 
             ? game.first_release_date 
             : new Date(game.first_release_date * 1000).toISOString().split('T')[0])
          : (game.release_date || null),
        publisher: game.involved_companies?.[0]?.company?.name 
          || game.publisher 
          || 'Desconocido',
        platforms: game.platforms 
          ? (typeof game.platforms === 'string' 
             ? game.platforms 
             : game.platforms.map(p => p.name).join(', '))
          : '',
        genres: game.genres 
          ? (typeof game.genres === 'string' 
             ? game.genres 
             : game.genres.map(g => g.name).join(', '))
          : ''
      };
    });
  } catch (err) {
    if (!axios.isCancel(err)) {
      console.error('Error fetching IGDB data:', err);
      error.value = 'No se pudieron cargar los juegos. Intenta nuevamente más tarde.';
    }
  } finally {
    isLoading.value = false;
  }
}


async function fetchData() {
  try {
    // Cancel any pending requests
    if (abortController.value) {
      abortController.value.abort();
    }
    
    abortController.value = new AbortController();
    
    // Parallel requests (mantenemos las otras peticiones)
    const [keysRes, genresRes] = await Promise.all([
      axios.get('/gamekeys', { signal: abortController.value.signal }),
      axios.get('/genres', { signal: abortController.value.signal })
    ]);
    
    keys.value = keysRes.data.filter(key => key.state === 'disponible');
    genres.value = genresRes.data;
    
    // Ahora obtenemos los juegos de IGDB
    await fetchIGDBGames();
  } catch (err) {
    if (!axios.isCancel(err)) {
      console.error('Error fetching data:', err);
      error.value = 'Error al cargar los datos.';
    }
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
        <!-- Mensaje de error -->
        <div v-if="error" class="bg-red-500 text-white p-4 text-center">
            {{ error }}
        </div>
        
        <!-- Loading state -->
        <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
        
        <section class="bg-yellow-500 text-center py-10">
            <h2 class="text-2xl font-bold">Ofertas Especiales en Juegos Digitales</h2>
        </section>
        
        <section class="container mx-auto p-6">
            <input 
                type="text" 
                placeholder="Buscar juegos..." 
                class="w-full p-2 rounded-lg text-gray-100 bg-gray-700"
                @input="searchGames($event.target.value)"
            >
        </section>

        <FeaturedCarrousel :games="games.slice(0, 5)" />

        <section class="container mx-auto p-6 flex flex-col items-center">
            <h2 class="text-2xl font-bold text-center">Categorías</h2>
            <div class="flex max-w-[100%] gap-4 pt-4 pb-4 justify-center"> 
                <div v-for="genre in genres.slice(0,2)" :key="genre.id">
                    <button class="bg-yellow-500 text-gray-900 uppercase px-4 py-2 rounded-lg hover:bg-yellow-400">
                        {{ genre.name }}
                    </button>
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
                        :description="game.description"
                        :platforms="game.platforms"
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