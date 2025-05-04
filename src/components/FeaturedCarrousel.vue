<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const platforms = ref([
  { id: 1, title: "", img: "../img/featured1.jpg" },
  { id: 2, title: "", img: "../img/featured2.jpg" },
  { id: 3, title: "", img: "../img/featured3.jpg" },
  { id: 4, title: "", img: "../img/featured4.jpg" },
  { id: 5, title: "", img: "../img/featured5.jpg" },
]);

const activeIndex = ref(2); // Tarjeta inicial
const interval = ref(null);

const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % platforms.value.length;
};

const prevSlide = () => {
  activeIndex.value = (activeIndex.value - 1 + platforms.value.length) % platforms.value.length;
};

const startCarousel = () => {
  interval.value = setInterval(nextSlide, 5000);
};

onMounted(startCarousel);
onUnmounted(() => clearInterval(interval.value));

const getCardStyle = (index) => {
  const totalCards = platforms.value.length;
  const adjustedIndex = (index - activeIndex.value + totalCards) % totalCards; // Hace el loop infinito
  const distance = adjustedIndex <= totalCards / 2 ? adjustedIndex : adjustedIndex - totalCards;
  const scale = 1 - Math.abs(distance) * 0.2;
  const zIndex = 10 - Math.abs(distance);
  const translateX = distance * 70;
  const blur = Math.abs(distance) * 2;

  return {
    transform: `translateX(${translateX}%) scale(${scale})`,
    zIndex,
    filter: `blur(${blur}px)`,
    transition: 'transform 0.6s ease, filter 0.6s ease',
  };
};
</script>

<template>
  <div class="relative max-w-500 flex items-center justify-center overflow-hidden">
    <!-- Botón Anterior -->
    <button @click="prevSlide" class="absolute left-4 bg-gray-900 p-2 rounded-full text-white hover:bg-gray-700 z-20">
      &#9665;
    </button>

    <!-- Carrusel -->
    <div class="relative flex items-center justify-center w-fit h-70">
      <div
        v-for="(platform, index) in platforms"
        :key="platform.id"
        class="absolute w-[600px] h-[300px] bg-gray-800 p-1 rounded-lg text-center shadow-lg"
        :style="getCardStyle(index)"
      >
        <img :src="platform.img" :alt="platform.title" class="w-full h-full object-cover rounded-lg">
        <h3 class="text-lg font-bold text-white mt-2">{{ platform.title }}</h3>
      </div>
    </div>

    <!-- Botón Siguiente -->
    <button @click="nextSlide" class="absolute right-4 bg-gray-900 p-2 rounded-full text-white hover:bg-gray-700 z-20">
      &#9655;
    </button>
  </div>
</template>

<style scoped>
/* Oculta la barra de desplazamiento si hubiera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
