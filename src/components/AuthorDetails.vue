<script setup lang="ts">
const props = defineProps({
    autorLibroId: {
        type: Number,
        required: true,
    },
});

const getAuthors = async () => {
  try {
    const res = await fetch(
      `https://lenn343.bsite.net/api/AutorLibro/${props.autorLibroId}`,
    );
    if (!res.ok) throw new Error("Error al obtener autores");
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const author = await getAuthors();
</script>

<template>
    <div>
        <h1 class="text-3xl font-bold">About the author</h1>
        <h2 class="text-xl font-semibold">
            {{ author.nombre }} {{ author.apellido }}
        </h2>
        <p class="text-gray-600">
            BirthDay:{{ " " }}
            {{ new Date(author.fechaNacimiento).toLocaleDateString() }}
        </p>

        <div class="mt-4 w-96">
            <h2 class="text-xl font-semibold mb-2">Academic Grades:</h2>
            <ul class="space-y-2">
                <li v-for="grado in author.gradosAcademicos" :key="grado.gradoAcademicoId">
                    <p class="font-medium">{{ grado.nombre }}</p>
                    <p class="text-sm">awarded by: {{ grado.centroAcademico }}</p>
                    <p class="text-xs text-gray-500">
                        {{ new Date(grado.fechaGrado).toLocaleDateString() }}
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>