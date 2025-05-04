<script setup>
    import { useRouter } from 'vue-router'
</script>

<template>
    <section class="bg-gray-900 text-white flex flex-col min-h-screen">

        <section class="bg-yellow-500 text-gray-900 text-center py-10">
            <h2 class="text-3xl font-bold">Panel de Administrador</h2>
            <p class="mt-2">Gestiona tu tienda de manera eficiente</p>
        </section>


        <main class="container mx-auto p-6 flex-grow">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div class="bg-gray-800 p-6 rounded-lg">
                    <h3 class="text-xl font-bold mb-4">Gestión de Productos</h3>
                    <ul class="space-y-2">
                        <li><RouterLink to="/admin/games" class="hover:text-yellow-400">Gestionar juegos</RouterLink></li>
                        <li><RouterLink to="/admin/genres" class="hover:text-yellow-400">Gestionar generos</RouterLink></li>
                    </ul>
                </div>

            </div>
        </main>

    </section>
</template>
