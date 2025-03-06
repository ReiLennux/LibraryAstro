<script setup lang="ts">
import { ref, watch } from 'vue';
const titulo = ref('');
const fechaPublicacion = ref('');
const libreriaMateriaId = ref('');
const AutorLibro = ref('');
const success = ref(false);
import pkg from 'lodash';
const {debounce} = pkg;

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

const searchQuery = ref("");

// Función con debounce
const debouncedSearch = debounce((query) => {
  console.log("Buscando:", query);
}, 500); 


watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery);
});

const authors = await getAuthors();


const handleSubmit = async () => {
  try {
    const newBook = {
      titulo: titulo.value,
      fechaPublicacion: fechaPublicacion.value,
      libreriaMateriaId: libreriaMateriaId.value,
      AutorLibro: AutorLibro.value
    };
    console.log(newBook);
    const response = await fetch("https://lenn343.somee.com/api/LibroMaterial/", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error('Error al crear el libro');
    }

    console.log('Libro creado correctamente');
    success.value = true;
    titulo.value = '';
    fechaPublicacion.value='';
    libreriaMateriaId.value = '';
    setTimeout(() => {
      success.value = false;
    }, 5000);


  } catch (error) {
    console.error('Error al crear el libro:', error);
  }
};

</script>

<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <div>
      <label for="titulo" class="block mb-2 text-sm font-medium">Title</label>
      <input type="text" v-model="titulo" id="titulo"
        class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
        placeholder="Book's title" required />
    </div>
    <div>
      <label for="fechaPublicacion" class="block mb-2 text-sm font-medium">Publication Date</label>
      <input type="date" v-model="fechaPublicacion" id="fechaPublicacion"
        class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
        required />
    </div>
    <div>
      <label for="AutorLibro" class="block mb-2 text-sm font-medium">Author</label>
      <select name="AutorLibro" id="AutorLibro" required v-model="AutorLibro"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="" disabled selected>Choose an author</option>
        <option v-for="author in authors" :key="author.autorLibroGuid" :value="author.autorLibroGuid">
          {{ author.nombre }} {{ author.apellido }}
        </option>
      </select>
    </div>

    <button type="submit"
      class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800">Add
      Book</button>
  </form>
  <div id="alert-1" v-if="success" class="mt-4 flex items-center p-4 mb-4 rounded-lg bg-green-800 text-green-400"
    role="alert">
    <span class="sr-only">Info</span>
    <div class="ms-3 text-sm font-medium">
      Se agrego correctamente!
    </div>
  </div>
</template>
