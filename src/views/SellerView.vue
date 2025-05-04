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
                        <li><a href="#" class="hover:text-yellow-400">Añadir nuevo producto</a></li>
                        <li><a href="#" class="hover:text-yellow-400">Editar productos existentes</a></li>
                        <li><a href="#" class="hover:text-yellow-400">Eliminar productos</a></li>
                    </ul>
                </div>

                <div class="bg-gray-800 p-6 rounded-lg">
                    <h3 class="text-xl font-bold mb-4">Gestión de Usuarios</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-yellow-400">Ver lista de usuarios</a></li>
                        <li><a href="#" class="hover:text-yellow-400">Editar información de usuario</a></li>
                        <li><a href="#" class="hover:text-yellow-400">Eliminar usuarios</a></li>
                    </ul>
                </div>

                <div class="bg-gray-800 p-6 rounded-lg">
                    <h3 class="text-xl font-bold mb-4">Gestión de Pedidos</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-yellow-400">Ver todos los pedidos</a></li>
                        <li><a href="#" class="hover:text-yellow-400">Cancelar pedidos</a></li>
                    </ul>
                </div>

                <div class="bg-gray-800 p-6 rounded-lg">
                    <h3 class="text-xl font-bold mb-4">Estadísticas</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-yellow-400">Ventas totales</a></li>
                        <li><a href="#" class="hover:text-yellow-400">Productos más vendidos</a></li>
                        <li><a href="#" class="hover:text-yellow-400">Usuarios activos</a></li>
                    </ul>
                </div>

                <div class="bg-gray-800 p-6 rounded-lg">
                    <h3 class="text-xl font-bold mb-4">Configuración</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-yellow-400">Ajustes de la tienda</a></li>
                        <li><a href="#" class="hover:text-yellow-400">Cambiar contraseña</a></li>
                    </ul>
                </div>

                <div class="bg-gray-800 p-6 rounded-lg">
                    <h3 class="text-xl font-bold mb-4">Soporte</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-yellow-400">Ver tickets abiertos</a></li>
                        <li><a href="#" class="hover:text-yellow-400">Documentación</a></li>
                    </ul>
                </div>
            </div>
        </main>

    </section>
</template>
