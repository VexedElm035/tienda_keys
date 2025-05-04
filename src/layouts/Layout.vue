<script setup>
import { ref } from 'vue';
import Header from '../components/Header.vue';
import SideBar from '../components/SideBar.vue';
import Footer from '../components/Footer.vue';
import { RouterView } from 'vue-router';

const isMenuVisible = ref(false);
const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header :hasSidebar="true" @toggle-menu="toggleMenu" />
    <div class="flex flex-1">
      <SideBar :isVisible="isMenuVisible" @toggle-menu="toggleMenu"/>
      <main class="flex-1">
        <router-view />
      </main>
    </div>
    <Footer />
  </div>
</template>

