<script setup lang="ts">
import type { Book } from '../lib/api';
import imageSrc from '../assets/Enchanting_Book.gif';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const getBooks = async () => {
  const res = await fetch("https://lenn343.somee.com/api/LibroMaterial/");
  const books = await res.json();
  return books;
};
const books = await getBooks();
</script>

<template>
  <div class="justify-center items-center flex flex-wrap gap-6">
    <div
      v-for="(book) in books.reverse()"
      :key="book.libreriaMateriaId"
      
    >
    <a :href="'/' + book.libreriaMateriaId" class="flex flex-col items-center w-96 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
      <img transition:name="image-book-details" class="m-4 h-48 w-48 object-cover rounded-lg" :src="imageSrc.src" alt="Libro imagen" />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="text-2xl font-semibold text-white truncate">{{ book.titulo }}</h5>
        <p class="text-gray-400 text-sm mt-2">{{ formatDate(book.fechaPublicacion!) }}</p>
        <div class="flex items-center mt-4 text-gray-300">
          <span class="text-sm">{{ book.libreriaMateriaId }}</span>
        </div>
      </div>
    </a>

    </div>
  </div>
</template>
