<script setup lang="ts">
const props = defineProps({
    libreriaMateriaId: {
        type: String,
        required: true,
    },
});

const getBook = async () => {
  try {
    const res = await fetch(
      `https://lenn343.somee.com/api/LibroMaterial/${props.libreriaMateriaId}`,
    );
    if (!res.ok) throw new Error("Error al obtener autores");
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

// const getAuthor = async (guid: string) => {
//   try {
//     const res = await fetch(
//       `https://lenn343.bsite.net/api/AutorLibro/${guid}`,
//     );
//     if (!res.ok) throw new Error("Error al obtener autores");
//     return await res.json();
//   } catch (error) {
//     console.error("Error:", error);
//     return null;
//   }
//};

const book = await getBook();
//const author = await getAuthor(book.autorLibro);
</script>

<template>
    <div class="min-h-screen p-8 max-w-xl">
  
      <div  class=" mx-auto bg-gray-900 rounded-lg shadow-md p-6">
        <div class="space-y-4">
          <h1 class="text-3xl font-bold text-gray-200">{{ book.titulo }}</h1>
          
          <div class="space-y-2 text-gray-600">
            <div>
              <span class="font-semibold">Guid:</span>
              <span class="ml-2 text-gray-200 font-mono">{{ libreriaMateriaId }}</span>
            </div>
            
            <div>
              <span class="font-semibold">Publish Date:</span>
              <span class="ml-2 text-gray-200">
                {{ new Date(book.fechaPublicacion).toLocaleDateString() }}
              </span>
            </div>
            
            <div>
              <span class="font-semibold">Author Guid:</span>
              <span class="ml-2 font-mono text-gray-200">{{ book.autorLibro }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

