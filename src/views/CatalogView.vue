<template>

<section class="bg-gray-900 text-white flex flex-col min-h-screen">

    <section class="container mx-auto p-6">
        <div class="flex justify-center">
            <input type="text" placeholder="Buscar juegos..." class="w-full max-w-2xl p-2 rounded-lg text-gray-900">
        </div>
    </section>


    <section class="container mx-auto p-6 flex-grow flex">

        <aside class="w-64 bg-gray-800 p-4 rounded-lg mr-6">
            <h2 class="text-xl font-bold mb-4">Filtros</h2>

            <div class="mb-6">
                <h3 class="font-semibold mb-2">Categoría</h3>
                <ul>
                    <li><label class="flex items-center"><input type="checkbox" class="mr-2"> Acción</label></li>
                    <li><label class="flex items-center"><input type="checkbox" class="mr-2"> Aventura</label></li>
                    <li><label class="flex items-center"><input type="checkbox" class="mr-2"> RPG</label></li>
                    <li><label class="flex items-center"><input type="checkbox" class="mr-2"> Estrategia</label></li>
                </ul>
            </div>

 
            <div class="mb-6">
                <h3 class="font-semibold mb-2">Plataforma</h3>
                <ul>
                    <li><label class="flex items-center"><input type="checkbox" class="mr-2"> PC</label></li>
                    <li><label class="flex items-center"><input type="checkbox" class="mr-2"> PlayStation</label></li>
                    <li><label class="flex items-center"><input type="checkbox" class="mr-2"> Xbox</label></li>
                    <li><label class="flex items-center"><input type="checkbox" class="mr-2"> Nintendo Switch</label></li>
                </ul>
            </div>

 
            <div class="mb-6">
                <h3 class="font-semibold mb-2">Género</h3>
                <ul>
                    <li><label class="flex items-center"><input type="checkbox" class="mr-2"> Shooter</label></li>
                    <li><label class="flex items-center"><input type="checkbox" class="mr-2"> Mundo abierto</label></li>
                    <li><label class="flex items-center"><input type="checkbox" class="mr-2"> Indie</label></li>
                    <li><label class="flex items-center"><input type="checkbox" class="mr-2"> Deportes</label></li>
                </ul>
            </div>

            <div class="mb-6">
                <h3 class="font-semibold mb-2">Rango de precio</h3>
                <input type="range" min="0" max="100" class="w-full">
                <div class="flex justify-between text-sm">
                    <span>$0</span>
                    <span>$100</span>
                </div>
            </div>
        </aside>

        <section class="flex-grow">
            <h2 class="text-2xl font-bold mb-6">Resultados de búsqueda</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div class="bg-gray-800 p-4 rounded-lg text-center">
                    <img src="https://i0.wp.com/gamepidia.com/wp-content/uploads/2024/02/ezgif-5-2b496b81f9.jpg?fit=500%2C750&ssl=1" alt="Juego" class="w-48 h-64 object-cover mx-auto mb-3 rounded-lg">
                    <h3 class="text-xl font-bold">Cyberpunk 2077</h3>
                    <p class="text-yellow-400 text-lg">$800.00</p>
                    <button class="mt-2 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400">Añadir al Carrito</button>
                    <a href="detalles.html" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 inline-block">Detalles</a>
                </div>


                <div class="bg-gray-800 p-4 rounded-lg text-center">
                    <img src="https://storage.googleapis.com/pod_public/750/216712.jpg" alt="Juego" class="w-48 h-64 object-cover mx-auto mb-3 rounded-lg">
                    <h3 class="text-xl font-bold">Elden Ring</h3>
                    <p class="text-yellow-400 text-lg">$1000.00</p>
                    <button class="mt-2 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400">Añadir al Carrito</button>
                    <a href="detalles.html" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 inline-block">Detalles</a>
                </div>


                <div class="bg-gray-800 p-4 rounded-lg text-center">
                    <img src="https://cdn.dekudeals.com/images/4a371469bfb7c32f1bc8a62779dd17f8063f281f/w500.jpg" alt="Juego" class="w-48 h-64 object-cover mx-auto mb-3 rounded-lg">
                    <h3 class="text-xl font-bold">The Witcher 3</h3>
                    <p class="text-yellow-400 text-lg">$500.00</p>
                    <button class="mt-2 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400">Añadir al Carrito</button>
                    <a href="detalles.html" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 inline-block">Detalles</a>
                </div>
            </div>
        </section>
    </section>
</section>



</template>