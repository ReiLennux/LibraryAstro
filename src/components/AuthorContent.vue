<script setup lang="ts">
import HelmetD from '../assets/HelmetD.png';
import HelmetG from '../assets/HelmetG.png';
import HelmetI from '../assets/HelmetI.png';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const Helmets = [HelmetD.src, HelmetG.src, HelmetI.src];

function getRandomHelmet() {
  const randomIndex = Math.floor(Math.random() * Helmets.length);
  return Helmets[randomIndex];
}

const getAuthors = async () => {
  try {
    const res = await fetch("https://lenn343.bsite.net/api/AutorLibro/");
    if (!res.ok) throw new Error('Error al obtener autores');
    return await res.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

const authors = await getAuthors();
</script>

<template>
  <div class="justify-center items-center flex flex-wrap gap-6">
    <div v-for="(author) in authors.reverse()" :key="author.AutorLibroId"
      class="">
      <a :href="'Authors/AuthorDetails/'+ author.autorLibroId" class="flex flex-col items-center w-96 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
        <img class="m-4 h-48 w-48 object-cover rounded-lg" :src="getRandomHelmet()" alt="Libro imagen" />
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="text-2xl font-semibold text-white truncate">{{ author.nombre + " " + author.apellido }}</h5>
          <p class="text-gray-400 text-sm mt-2">{{ formatDate(author.fechaNacimiento) }}</p>
          <div class="flex items-center mt-4 text-gray-300">
            <span class="text-sm">{{ author.autorLibroGuid }}</span>
          </div>

        </div>
      </a>
    </div>
  </div>
</template>