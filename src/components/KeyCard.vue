<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

function getFlagEmoji(countryCode) {
    return getUnicodeFlagIcon(countryCode);
}

defineProps(['id', 'name', 'platform', 'price', 'region', 'seller', 'img', 'rate', 'deliverytime']);

let platformImages = {
    PS4: "../img/cover_ps4.png",
    PS5: "../img/cover_ps5.png",
    xboxone: "../img/cover_xboxone.png",
    xboxseries: "../img/cover_xboxseries.png",
    Switch: "../img/cover_switch.png",
    steam: "../img/cover_steam.png",
};



const isHovered = ref(false);
</script>

<template>
    <div id="card" 
         class="bg-gray-800 rounded-lg text-left max-w-60 mb-5 mt-5 overflow-hidden h-[450px]"
         @mouseenter="isHovered = true" 
         @mouseleave="isHovered = false">
        <div class="flex flex-col h-full relative">
            <!-- Image container with vignette effect -->
            <div class='relative overflow-hidden flex-shrink-0 h-[350px]'>
                <img :src="`${img}`" 
                     alt="img" 
                     class="w-full h-full object-cover rounded-lg transition-all duration-300 mt-4"
                     :class="{'scale-105': isHovered, 'brightness-75': isHovered}">

                <div v-if="platformImages[platform]" class="absolute top-0 w-fit h-fit">
                    <img :src="platformImages[platform]" :alt="platform" class="w-100 h-full object-contain">
                </div>
            </div>
            
            <!-- Info container - fixed height with absolute positioning for the hover effect -->
            <div class="p-3 bg-gray-800 flex flex-col justify-between min-h-[100px] absolute bottom-0 left-0 right-0 transition-all duration-300 z-10"
                 :class="{'translate-y-0': !isHovered, '-translate-y-1 bg-gray-700': isHovered}">
                <div>
                    <h3 class="text-sm font-bold mb-1">{{ name }}</h3>
                    <div class="flex">
                        
                        <h4 class="text-sm text-green-500 font-bold uppercase mb-1">{{ region }}</h4>
                        <!-- <p class="ml-3">{{getFlagEmoji(region)}}</p> -->
                    </div>
                    
                   
                    <div class="flex items-center gap-2 ">
                        <span class="text-white-100 text-l">{{ price }}</span>
                        <span class="text-gray-400 line-through text-sm">{{ price }}</span>
                    </div>
                </div>
                
                <!-- Buttons that appear on hover -->
                <div class="mt-3 flex gap-2 transition-all duration-300 flex-col"
                     :class="{'opacity-0 h-0 overflow-hidden': !isHovered, 'opacity-100 h-auto': isHovered}">
                    <button class="text-sm flex-1 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400">
                        Añadir al Carrito
                    </button>
                    <RouterLink :to="`/key/${id}`" 
                               class="text-center text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400">
                        Detalles
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* Vignette effect for the image */
.vignette {
    position: relative;
}

.vignette::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.7);
    border-radius: 0.5rem;
    pointer-events: none;
}
</style>