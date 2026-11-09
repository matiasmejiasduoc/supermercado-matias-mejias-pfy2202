export const CATEGORIES = [
  { id: 'frutas-verduras', name: 'Frutas y verduras' },
  { id: 'lacteos', name: 'Lácteos' },
  { id: 'panaderia', name: 'Panadería' },
  { id: 'carnes', name: 'Carnes' },
  { id: 'bebidas', name: 'Bebidas' },
  { id: 'despensa', name: 'Despensa' },
  { id: 'limpieza', name: 'Limpieza' },
]

export const getCategoryName = (id) =>
  CATEGORIES.find((category) => category.id === id)?.name ?? 'Sin categoría'
