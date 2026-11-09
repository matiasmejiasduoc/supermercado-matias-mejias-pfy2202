# SuperMercado · Gestión de inventario

Sitio publicado: https://matiasmejiasduoc.github.io/supermercado-matias-mejias-pfy2202/

Sitio web para gestionar el inventario de un supermercado, desarrollado con React, React Router y Tailwind CSS para la asignatura Desarrollo Frontend II (PFY2202).

## Funcionalidades

- **Inicio:** bienvenida con el total de artículos registrados y agotados.
- **Agregar artículo:** formulario con validaciones para registrar nuevos artículos.
- **Listado de artículos:** muestra todos los artículos con su categoría, precio, unidad y stock.
- **Filtro por categoría:** un selector filtra la tabla según la categoría elegida. El filtro se calcula a partir del inventario original, por lo que los datos nunca se pierden.
- **Detalle de artículo:** al hacer clic en un artículo se muestra su información completa y se puede agregar al carrito eligiendo la cantidad. Al agregarlo se descuenta del stock disponible.
- **Carrito de compras:** lista los artículos agregados, permite aumentar, disminuir o quitar cantidades y vaciar el carrito. Cada cambio actualiza el inventario general.
- Los datos se guardan en `localStorage` para mantenerlos al recargar la página.

## Tecnologías

- React 19 + Vite
- React Router (rutas anidadas, parámetros dinámicos y carga diferida con `React.lazy` y `Suspense`)
- Context API + `useReducer` para el estado global del inventario y el carrito
- Tailwind CSS 3 (clases reutilizables con `@apply`)

## Estructura del proyecto

```
src/
├── components/   Componentes reutilizables (Button, ProductTable, CategoryFilter, CartItem, QuantityControl, etc.)
├── context/      Estado global: contextos, reducer del inventario y hook useInventory
├── data/         Categorías e inventario inicial
├── layouts/      MainLayout con Navbar, Footer y Outlet
├── pages/        Home, ProductList, ProductDetail, AddProduct, Cart, NotFound
├── routes/       AppRoutes con la configuración centralizada de rutas
└── utils/        Formato de precios en CLP
```

## Rutas

| Ruta | Pantalla |
| --- | --- |
| `/` | Inicio |
| `/productos` | Listado de artículos con filtro |
| `/productos/nuevo` | Agregar artículo |
| `/productos/:productId` | Detalle del artículo |
| `/carrito` | Carrito de compras |

## Instalación y ejecución

```bash
npm install
npm run dev
```

Luego abrir la URL que indica la consola (por defecto `http://localhost:5173`).

## Autor

Matías Mejías · Desarrollo Frontend II (PFY2202) · Duoc UC
