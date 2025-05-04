<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
//import { useCartStore } from '@/stores/cart'; // <-- tu store del carrito
import { useAuthStore } from '@/stores/auth'; // <-- tu store de autenticación
const authStore = useAuthStore();
const userId = computed(() => authStore.userId);

const route = useRoute();
const router = useRouter();
//const cart = useCartStore();
const cart = ref([]);
const isSinglePurchase = computed(() => !!route.params.id);

const keyId = route.params.id;
const keys = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    if (isSinglePurchase.value) {
      const { data } = await axios.get(`/gamekeys/${keyId}`);
      keys.value = [data];
    } else {
      // obtener detalles de cada key en el carrito
      //const keyPromises = cart.items.map(id => axios.get(`/gamekeys/${id}`));
      //const responses = await Promise.all(keyPromises);
      //keys.value = responses.map(r => r.data);
    }
  } catch (err) {
    error.value = 'No se pudo cargar la(s) key(s)';
  } finally {
    loading.value = false;
  }
});

const realizarCompra = async () => {
  try {
// Simulado
    for (const key of keys.value) {
      await axios.post('/purchases', {
        user_id: userId.value,
        key_id: key.id,
        tax: Number(key.tax),
        pay_method: 'Tarjeta',
        state: 'pendiente',
        total: Number(key.price) + Number(key.tax),
      });

      await axios.put(`/gamekeys/${key.id}`, {
        state: 'vendida',
      });
    }

    alert('Compra realizada con éxito');

    if (!isSinglePurchase.value) cart.clear(); // vaciar carrito
    router.push('/');
  } catch (err) {
    console.error(err);
    alert('Error al realizar la compra');
  }
};
</script>

<template>
    <section class="bg-gray-900 text-white min-h-screen p-10">
      <h1 class="text-3xl font-bold mb-6">Resumen de compra</h1>
  
      <div v-if="loading">Cargando...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div 
          v-for="key in keys"
          :key="key.id"
          class="bg-gray-800 p-4 mb-4 rounded-lg"
        >
          <h2 class="text-xl font-semibold mb-2">{{ key.game?.name }}</h2>
          <p>Precio: ${{ key.price }}</p>
          <p>Región: {{ key.region }}</p>
          <p>Plataforma: {{ key.platform }}</p>
        </div>
  
        <p class="text-xl mt-6">Total: ${{ keys.reduce((sum, k) => sum + k.price, 0) }}</p>
  
        <p class="my-4">Método de pago: Tarjeta (Simulado)</p>
  
        <button 
          @click="realizarCompra"
          class="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg"
        >
          Confirmar compra
        </button>
      </div>
    </section>
  </template>
  