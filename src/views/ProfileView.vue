<script setup>
    import router from '@/router';
    import axios from 'axios';
    import { ref, onMounted, computed } from 'vue';
    import { useAuthStore } from '@/stores/auth';
    import { useRoute } from 'vue-router';

    const authStore = useAuthStore();   
    const token = computed(() => authStore.token);
    const route = useRoute();
    const userId = route.params.id;
    let user = ref({});

    onMounted(async () => {
    try {
        const response = await axios.get(`/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token.value}`
        }
        });
        user.value = response.data;
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        if (error.response && error.response.status === 401) {
        router.push('/login'); // Redirige si el token no es válido
        }
    }
    });
</script>


<template>

<section class="bg-gray-900 text-white min-h-screen flex flex-col">


    <section class="container mx-auto p-6 flex-grow">
        <h2 class="text-3xl font-bold mb-6">Perfil del Usuario</h2>


        <section class="bg-gray-800 p-6 rounded-lg mb-6">
            <h3 class="text-xl font-semibold mb-4">Información de la cuenta</h3>
            <div class="flex items-center gap-6">
                <img :src="user.avatar ? `${user.avatar}` : '../img/def.jpg'" class="w-32 h-32 rounded-full object-cover" />

                <div class="flex-1">
                    <label class="block mb-2">Nombre de usuario</label>
                    <input type="text" :value="`${user.username}`" class="w-full p-2 rounded text-gray-100 mb-4" />
                    
                    <label class="block mb-2">Correo electrónico</label>
                    <input type="email" :value="`${user.email}`" class="w-full p-2 rounded text-gray-100" />
                </div>
            </div>
        </section>

        <section class="bg-gray-800 p-6 rounded-lg mb-6">
            <h3 class="text-xl font-semibold mb-4">Métodos de Pago</h3>
            <label class="block mb-2">Agregar tarjeta de crédito/débito</label>
            <input type="text" placeholder="Número de tarjeta" class="w-full p-2 rounded text-gray-100 mb-2" />
            <div class="flex gap-2">
                <input type="text" placeholder="MM/AA" class="w-1/2 p-2 rounded text-gray-100 mb-2" />
                <input type="text" placeholder="CVV" class="w-1/2 p-2 rounded text-gray-100 mb-2" />
            </div>
            <button class="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400">Guardar método</button>
        </section>

        <section class="bg-gray-800 p-6 rounded-lg mb-6">
            <h3 class="text-xl font-semibold mb-4">Mis Compras</h3>
            <ul class="list-disc pl-6">
                <li>Cyberpunk 2077 - 01/04/2025</li>
                <li>Elden Ring - 23/03/2025</li>
            </ul>
        </section>

        <section class="bg-gray-800 p-6 rounded-lg mb-6">
            <h3 class="text-xl font-semibold mb-4">Mis Keys</h3>
            <ul class="list-disc pl-6">
                <li>Steam - The Witcher 3: XXXXX-YYYYY-ZZZZZ</li>
                <li>Origin - Battlefield V: AAAA-BBBB-CCCC</li>
            </ul>
        </section>

        
    </section>


</section>

</template> 