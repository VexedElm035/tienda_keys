<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Estados para controlar la UI
const activeSection = ref(null); // 'genres' o 'games'
const showForm = ref(false);
const isEditing = ref(false);
const currentItem = ref(null);

// Datos
const genres = ref([]);
const games = ref([]);
const publishers = ref([]);
const allPlatforms = ref(['ps4', 'ps5', 'xboxone', 'xboxseries', 'nswitch', 'steam']);
const selectedPlatforms = ref([]);
const selectedGenres = ref([]);

// Formulario para géneros
const genreForm = ref({
  name: ''
});

// Formulario para juegos
const gameForm = ref({
  name: '',
  description: '',
  launch_date: '',
  publisher: '',
  img: null,
  previewImage: null
});

// Cargar datos iniciales
async function loadInitialData() {
  try {
    const [genresRes, gamesRes] = await Promise.all([
      axios.get('/genres'),
      axios.get('/games')
    ]);
    
    genres.value = genresRes.data;
    games.value = gamesRes.data;
    
    // Extraer publishers únicos de los juegos existentes
    const uniquePublishers = [...new Set(gamesRes.data.map(game => game.publisher))];
    publishers.value = uniquePublishers.filter(p => p);
  } catch (error) {
    console.error('Error loading initial data:', error);
  }
}

// Cargar datos según sección activa
async function loadData() {
  try {
    if (activeSection.value === 'genres') {
      const response = await axios.get('/genres');
      genres.value = response.data;
    } else if (activeSection.value === 'games') {
      const response = await axios.get('/games');
      games.value = response.data;
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Mostrar formulario para nuevo item
function showAddForm() {
  showForm.value = true;
  isEditing.value = false;
  
  if (activeSection.value === 'genres') {
    genreForm.value = { name: '' };
  } else {
    gameForm.value = { 
      name: '',
      description: '',
      launch_date: '',
      publisher: '',
      img: null,
      previewImage: null
    };
    selectedPlatforms.value = [];
    selectedGenres.value = [];
  }
}

// Mostrar formulario para editar
function showEditForm(item) {
  showForm.value = true;
  isEditing.value = true;
  currentItem.value = item;
  
  if (activeSection.value === 'genres') {
    genreForm.value = { ...item };
  } else {
    gameForm.value = { 
      ...item,
      previewImage: item.img ? item.img : null
    };
    selectedPlatforms.value = item.available_platform ? item.available_platform.split(',') : [];
    selectedGenres.value = item.genre_id ? item.genre_id.split(',').map(Number) : [];
  }
}

// Volver al listado
function backToList() {
  showForm.value = false;
  currentItem.value = null;
}

// Manejar subida de imagen
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    gameForm.value.img = file;
    
    // Mostrar previsualización
    const reader = new FileReader();
    reader.onload = (e) => {
      gameForm.value.previewImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Enviar formulario de género
async function submitGenreForm() {
  try {
    if (isEditing.value) {
      await axios.put(`/genres/${currentItem.value.id}`, genreForm.value);
    } else {
      await axios.post('/genres', genreForm.value);
    }
    await loadData();
    backToList();
  } catch (error) {
    console.error('Error saving genre:', error);
  }
}

// Enviar formulario de juego
async function submitGameForm() {
  try {
    const formData = new FormData();
    formData.append('name', gameForm.value.name);
    formData.append('description', gameForm.value.description);
    formData.append('launch_date', gameForm.value.launch_date);
    formData.append('publisher', gameForm.value.publisher);
    formData.append('available_platform', selectedPlatforms.value.join(','));
    formData.append('genre_id', selectedGenres.value.join(','));
    
    if (gameForm.value.img instanceof File) {
      formData.append('img', gameForm.value.img);
    }

    if (isEditing.value) {
      await axios.put(`/games/${currentItem.value.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } else {
      await axios.post('/games', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
    
    await loadData();
    backToList();
  } catch (error) {
    console.error('Error saving game:', error);
  }
}

// Toggle platform selection
function togglePlatform(platform) {
  const index = selectedPlatforms.value.indexOf(platform);
  if (index === -1) {
    selectedPlatforms.value.push(platform);
  } else {
    selectedPlatforms.value.splice(index, 1);
  }
}

// Toggle genre selection
function toggleGenre(genreId) {
  const index = selectedGenres.value.indexOf(genreId);
  if (index === -1) {
    selectedGenres.value.push(genreId);
  } else {
    selectedGenres.value.splice(index, 1);
  }
}

// Cargar datos al montar el componente
onMounted(loadInitialData);
</script>

<template>
  <section class="bg-gray-900 text-white flex flex-col min-h-screen">
    <section class="bg-yellow-500 text-gray-900 text-center py-10">
      <h2 class="text-3xl font-bold">Panel de Administrador</h2>
    </section>

    <main class="container mx-auto p-6 flex-grow">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">Gestión de Productos</h3>
          <ul class="space-y-2">
            <li>
              <button 
                @click="activeSection = 'genres'; loadData()" 
                class="hover:text-yellow-400"
              >
                Gestionar géneros
              </button>
            </li>
            <li>
              <button 
                @click="activeSection = 'games'; loadData()" 
                class="hover:text-yellow-400"
              >
                Gestionar juegos
              </button>
            </li>
          </ul>
        </div>
      </div>
    </main>

    <!-- Panel flotante -->
    <div 
      v-if="activeSection" 
      class="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 p-8 overflow-y-auto"
    >
      <div class="container mx-auto bg-gray-800 rounded-lg p-6 max-w-6xl">
        <!-- Header del panel -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">
            {{ showForm ? 
              (isEditing ? `Editar ${activeSection === 'genres' ? 'Género' : 'Juego'}` : 
              `Agregar ${activeSection === 'genres' ? 'Género' : 'Juego'}`) : 
              `Lista de ${activeSection === 'genres' ? 'Géneros' : 'Juegos'}` }}
          </h2>
          
          <div class="flex space-x-4">
            <button 
              v-if="!showForm" 
              @click="showAddForm" 
              class="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400"
            >
              Agregar {{ activeSection === 'genres' ? 'Género' : 'Juego' }}
            </button>
            <button 
              @click="backToList" 
              class="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              {{ showForm ? 'Volver' : 'Cerrar' }}
            </button>
          </div>
        </div>

        <!-- Contenido del panel -->
        <div v-if="!showForm">
          <!-- Lista de items -->
          <div class="flex overflow-x-auto space-x-4 pb-4">
            <div 
              v-for="item in (activeSection === 'genres' ? genres : games)" 
              :key="item.id" 
              class="bg-gray-700 p-4 rounded-lg min-w-[250px] flex-shrink-0"
            >
              <h3 class="text-lg font-bold">{{ item.name }}</h3>
              <p v-if="activeSection === 'games'" class="text-gray-400 text-sm">
                {{ item.publisher }} - {{ item.launch_date }}
              </p>
              
              <div class="flex justify-end space-x-2 mt-4">
                <button 
                  @click="showEditForm(item)" 
                  class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400"
                >
                  Editar
                </button>
                <button 
                  @click="deleteItem(item.id)" 
                  class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Formulario para géneros -->
        <div v-else-if="activeSection === 'genres'">
          <form @submit.prevent="submitGenreForm" class="space-y-4">
            <div>
              <label class="block mb-2">Nombre del género</label>
              <input 
                v-model="genreForm.name" 
                type="text" 
                class="w-full p-2 rounded bg-gray-700 border border-gray-600"
                required
              >
            </div>
            
            <div class="flex justify-end space-x-4">
              <button 
                type="button" 
                @click="backToList" 
                class="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                class="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400"
              >
                {{ isEditing ? 'Actualizar' : 'Guardar' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Formulario para juegos -->
        <div v-else>
          <form @submit.prevent="submitGameForm" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="block mb-2">Nombre del juego</label>
                  <input 
                    v-model="gameForm.name" 
                    type="text" 
                    class="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    required
                  >
                </div>
                
                <div>
                  <label class="block mb-2">Descripción</label>
                  <textarea 
                    v-model="gameForm.description" 
                    class="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    rows="3"
                  ></textarea>
                </div>
                
                <div>
                  <label class="block mb-2">Fecha de lanzamiento</label>
                  <input 
                    v-model="gameForm.launch_date" 
                    type="date" 
                    class="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    required
                  >
                </div>
                
                <div>
                  <label class="block mb-2">Publisher</label>
                  <input 
                    v-model="gameForm.publisher" 
                    list="publishers"
                    class="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    required
                  >
                  <datalist id="publishers">
                    <option v-for="publisher in publishers" :key="publisher" :value="publisher"></option>
                  </datalist>
                </div>
              </div>
              
              <div class="space-y-4">
                <div>
                  <label class="block mb-2">Imagen del juego</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    @change="handleImageUpload"
                    class="w-full p-2 rounded bg-gray-700 border border-gray-600"
                  >
                  <div v-if="gameForm.previewImage" class="mt-4">
                    <img :src="gameForm.previewImage" alt="Preview" class="max-h-40 rounded">
                  </div>
                </div>
                
                <div>
                  <label class="block mb-2">Plataformas disponibles</label>
                  <div class="flex flex-wrap gap-2">
                    <button 
                      v-for="platform in allPlatforms" 
                      :key="platform"
                      type="button"
                      @click="togglePlatform(platform)"
                      class="px-3 py-1 rounded"
                      :class="{
                        'bg-yellow-500 text-gray-900': selectedPlatforms.includes(platform),
                        'bg-gray-700 hover:bg-gray-600': !selectedPlatforms.includes(platform)
                      }"
                    >
                      {{ platform }}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label class="block mb-2">Géneros</label>
                  <div class="flex flex-wrap gap-2">
                    <button 
                      v-for="genre in genres" 
                      :key="genre.id"
                      type="button"
                      @click="toggleGenre(genre.id)"
                      class="px-3 py-1 rounded"
                      :class="{
                        'bg-yellow-500 text-gray-900': selectedGenres.includes(genre.id),
                        'bg-gray-700 hover:bg-gray-600': !selectedGenres.includes(genre.id)
                      }"
                    >
                      {{ genre.name }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end space-x-4">
              <button 
                type="button" 
                @click="backToList" 
                class="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                class="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400"
              >
                {{ isEditing ? 'Actualizar' : 'Guardar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
