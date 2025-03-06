<script setup lang="ts">
import { ref } from 'vue';

const nombre = ref('');
const apellido = ref('');
const fechaNacimiento = ref('');
const gradosAcademicos = ref<{ nombre: string; centroAcademico: string; fechaGrado: string }[]>([]);
const nuevoGrado = ref({ nombre: '', centroAcademico: '', fechaGrado: '' });

function agregarGrado () {
  if (nuevoGrado.value.nombre && nuevoGrado.value.centroAcademico && nuevoGrado.value.fechaGrado) {
    gradosAcademicos.value.push({ ...nuevoGrado.value }); // Clonar objeto para evitar referencias
    nuevoGrado.value = { nombre: '', centroAcademico: '', fechaGrado: '' }; // Reset
  }
};

const success = ref(false);

const handleSubmit = async () => {
  console.log(gradosAcademicos.value)
  try {
    const newAuthor = {
      nombre: nombre.value,
      apellido: apellido.value,
      fechaNacimiento: fechaNacimiento.value,
      gradosAcademicos: gradosAcademicos.value.map(grado => ({ ...grado })) // Clona los objetos
   };
    const response = await fetch("https://lenn343.bsite.net/api/AutorLibro", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAuthor),
    });
    console.log(newAuthor);

    if (!response.ok) {
      throw new Error('Error al crear el autor');
    }

    console.log('Autor creado correctamente');
    success.value = true;
    
    setTimeout(() => {
      success.value = false;
    }, 5000);

    
  } catch (error) {
    console.error('Error al crear el libro:', error);
  }
};

const formatDate = (date: string) => new Date(date).toLocaleDateString();
</script>

<template>
  <div class="w-2/4 mx-auto grid grid-cols-2 grid-rows-3 gap-4">
    
    <div id="alert-1" v-if="success" class="w-full col-span-2 mt-4 flex items-center p-4 mb-4 rounded-lg bg-green-800 text-green-400"
    role="alert">
    <span class="sr-only">Info</span>
    <div class="ms-3 text-sm font-medium">
      Se agrego correctamente!
    </div>
  </div>
    <!-- Primer div -->
    <div class="p-4 border rounded-lg shadow-sm sm:p-6 md:p-8 bg-gray-900 border-gray-700">
      <div class="flex justify-start items-start">
        <a href="/Authors" class="px-3 py-2 text-xs font-medium text-center rounded-lg dark:bg-gray-900 dark:hover:bg-gray-800">
          Back
        </a>
      </div>

      <div class="flex flex-col justify-center items-center">
        <!-- <img transition:name="image-book" class="m-4 h-48 w-48 object-cover rounded-lg" src="" alt="Libro imagen" /> -->
        <h5 class="text-xl font-medium">Register a Book</h5>
      </div>
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="nombre" class="block mb-2 text-sm font-medium text-gray-500">Name:</label>
          <input type="text" v-model="nombre" id="nombre"
            class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="Author's Name" required />
        </div>
        <div>
          <label for="apellido" class="block mb-2 text-sm font-medium text-gray-500">Last Name:</label>
          <input type="text" v-model="apellido" id="apellido"
            class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="Author's Last Name" required />
        </div>
        <div>
          <label for="fechaNacimiento" class="block mb-2 text-sm font-medium text-gray-500">Birth Date:</label>
          <input type="date" v-model="fechaNacimiento" id="fechaNacimiento"
            class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            required />
        </div>

        <button type="submit"
          class="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Save Information
        </button>
      </form>
    </div>

    <!-- Segundo div -->
    <div class="p-4 border rounded-lg shadow-sm sm:p-6 md:p-8 bg-gray-900 border-gray-700">
      <div class="mt-6 ">
        <h2 class="text-lg font-semibold text-white flex flex-col justify-center items-center">Academic Grades</h2>
        <div class="space-y-4">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-500">Grade Name:</label>
            <input type="text" v-model="nuevoGrado.nombre"
              class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
              placeholder="Academic Grade Name" required />
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-500">Academic Center:</label>
            <input type="text" v-model="nuevoGrado.centroAcademico"
              class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
              placeholder="Academic Center" required />
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-500">Graduation Date:</label>
            <input type="date" v-model="nuevoGrado.fechaGrado"
              class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
              required />
          </div>
          <button type="button" @click="agregarGrado()"
            class="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Add Grade
          </button>
        </div>
      </div>
    </div>

    <!-- Tercer div -->
    <div class="col-span-2 p-4 border rounded-lg shadow-sm sm:p-6 md:p-8 bg-gray-900 border-gray-700">
      
        <h2 class="text-lg font-semibold text-white">Author's Academic Grades</h2>
        <div v-if="gradosAcademicos.length" class="mt-8">
          <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div v-for="(grado, index) in gradosAcademicos" :key="index"
              class="flex flex-col items-center bg-gray-800 hover:bg-gray-700 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 p-4">
              <div class="flex flex-col justify-between text-center">
                <h5 class="text-2xl font-semibold text-white truncate">{{ grado.nombre }}</h5>
                <p class="text-gray-400 text-sm mt-2">{{ formatDate(grado.fechaGrado) }}</p>
                <span class="text-sm text-gray-300">{{ grado.centroAcademico }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p><i class="text-gray-500">Add an Academic grade first</i></p>
        </div>
    </div>
  </div>
</template>
