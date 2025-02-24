<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getBooks, type Book } from '../lib/api';

const books = ref<Book[]>([]);

onMounted(async () => {
  try {
    books.value = await getBooks();
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div>
    <h2>Lista de Libros</h2>
    <ul>
      <li v-for="book in books" :key="book.id">{{ book.title }}</li>
    </ul>
  </div>
  <div v-for="book in books" :key="book.LibreriaMateriaId"
  class="flex flex-col items-center  border  rounded-lg shadow-sm md:flex-row md:max-w-xl border-gray-700 bg-gray-800 hover:bg-gray-700">
    <img class="m-4 h-32" src="../assets/Enchanting_Book.gif" alt="">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight  text-white">{{ book.Titulo }}</h5>
        <p class="mb-3 font-normal text-gray-400">{{ FechaPublicacion }}</p>
    </div>
</div>
</template>
