<script setup lang="ts">
import { ref } from 'vue';

const titulo = ref('');
const fechaPublicacion = ref('');
const libreriaMateriaId = ref('');

const handleSubmit = async () => {
  try {
    const newBook = {
      titulo: titulo.value,
      fechaPublicacion: fechaPublicacion.value,
      libreriaMateriaId: libreriaMateriaId.value,
      AutorLibro: 'd5b67494-da20-4aa1-a718-20d69f84c8eb'
    };
    const response = await fetch("https://lenn343.somee.com/api/LibroMaterial/", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    });
  
    if (!response.ok) {
      throw new Error('Error al crear el libro');
    }
  
    if (response.status === 204) {
      console.log('Libro creado, pero sin respuesta.');
    }
  
    console.log('Libro creado correctamente');
  } catch (error) {
    console.error('Error al crear el libro:', error);
  }
};
</script>

<template>

    <form class="space-y-6" @submit.prevent="handleSubmit">
      
      <div>
        <label for="titulo" class="block mb-2 text-sm font-medium">Title</label>
        <input type="text" v-model="titulo" id="titulo" class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="Book's title" required />
      </div>
      <div>
        <label for="fechaPublicacion" class="block mb-2 text-sm font-medium">Publication Date</label>
        <input type="date" v-model="fechaPublicacion" id="fechaPublicacion" class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required />
      </div>

      <button type="submit" class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800">Add Book</button>
    </form>
</template>
