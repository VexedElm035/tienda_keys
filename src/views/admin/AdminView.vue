<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const stats = ref({
  totalEarnings: 0,
  totalPurchases: 0,
  averageTax: 0
});
const isLoading = ref(true);
const error = ref(null);

const fetchStats = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get('/admin/earnings');
    stats.value = {
      totalEarnings: response.data.total_earnings,
      totalPurchases: response.data.total_purchases,
      averageTax: response.data.average_tax
    };
  } catch (err) {
    error.value = err.response?.data?.message || 'Error al cargar las estadísticas';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchStats();
});
</script>

<template>
    <section class="bg-gray-900 text-white flex flex-col min-h-screen">
        <section class="bg-yellow-500 text-gray-900 text-center py-10">
            <h2 class="text-3xl font-bold">Panel de Administrador</h2>
            <p class="mt-2">Gestiona tu tienda de manera eficiente</p>
        </section>

        <main class="container mx-auto p-6 flex-grow">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Tarjeta de Ganancias Totales -->
                <div class="bg-gray-800 p-6 rounded-lg border-l-4 border-yellow-500">
                    <h3 class="text-xl font-bold mb-4">Ganancias por Impuestos</h3>
                    
                    <div v-if="isLoading" class="animate-pulse space-y-3">
                        <div class="h-8 bg-gray-700 rounded w-3/4"></div>
                        <div class="h-4 bg-gray-700 rounded w-1/2"></div>
                        <div class="h-4 bg-gray-700 rounded w-2/3"></div>
                    </div>
                    
                    <div v-else-if="error" class="text-red-400 text-sm">
                        {{ error }}
                    </div>
                    
                    <div v-else class="space-y-2">
                        <div>
                            <p class="text-3xl font-bold text-yellow-400">
                                ${{ stats.totalEarnings }}
                            </p>
                            <p class="text-gray-400 text-sm">Total en impuestos</p>
                        </div>
                        
                        <div class="pt-2 mt-2 border-t border-gray-700">
                            <p class="text-white">
                                <span class="text-gray-400">Total compras:</span> 
                                {{ stats.totalPurchases }}
                            </p>
                            <p class="text-white">
                                <span class="text-gray-400">Promedio por compra:</span> 
                                ${{ stats.averageTax }}
                            </p>
                        </div>
                        
                        <div class="mt-4 pt-4 border-t border-gray-700">
                            <RouterLink 
                                to="/admin/purchases" 
                                class="text-sm text-yellow-400 hover:text-yellow-300 flex items-center gap-1"
                            >
                                Ver todas las compras
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </RouterLink>
                        </div>
                    </div>
                </div>

                <!-- Otras tarjetas del panel -->
                <div class="bg-gray-800 p-6 rounded-lg">
                    <h3 class="text-xl font-bold mb-4">Gestión de Productos</h3>
                    <ul class="space-y-2">
                        <li><RouterLink to="/admin/games" class="hover:text-yellow-400">Gestionar juegos</RouterLink></li>
                        <li><RouterLink to="/admin/genres" class="hover:text-yellow-400">Gestionar generos</RouterLink></li>
                        <li><RouterLink to="/admin/users" class="hover:text-yellow-400">Gestionar usuarios</RouterLink></li>
                    </ul>
                </div>
                
                <!-- Puedes agregar más tarjetas de estadísticas aquí -->
            </div>
        </main>
    </section>
</template>