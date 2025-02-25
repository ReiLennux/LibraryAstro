export const API_URL = 'http://lenn343.somee.com/api/LibroMaterial/';

// Obtener lista de libros
export async function getBooks(): Promise<Book[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener los libros');
    }
    return response.json();
  }
  
  // Obtener un libro por ID
  export async function getBookById(id: number): Promise<Book> {
    const response = await fetch(`${API_URL}${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el libro con ID ' + id);
    }
    return response.json();
  }
  
  // Crear un nuevo libro
  export async function createBook(book: Book): Promise<void> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
  
    if (!response.ok) {
      throw new Error('Error al crear el libro');
    }
  
    if (response.status === 204) {
      console.log('Libro creado, pero sin respuesta.');
    }
  }
  
  
export interface Book {
    libreriaMateriaId?: string;
    titulo: string;
    fechaPublicacion?: string;
    autorLibro?: string;
}