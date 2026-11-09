import ButtonLink from '../components/ButtonLink'
import { useInventory } from '../context/useInventory'

export default function Home() {
  const { inventory } = useInventory()
  const outOfStock = inventory.filter((product) => product.stock === 0).length

  return (
    <div className="card p-6">
      <h1 className="text-2xl font-bold">Bienvenido al sistema de inventario</h1>
      <p className="mt-2 text-gray-600">
        Desde aquí puedes revisar los artículos del supermercado, agregar nuevos productos y armar un carrito de compras.
      </p>
      <p className="mt-4 text-sm text-gray-600">
        Artículos registrados: <strong>{inventory.length}</strong> · Agotados: <strong>{outOfStock}</strong>
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <ButtonLink to="/productos">Ver inventario</ButtonLink>
        <ButtonLink to="/productos/nuevo" variant="secondary">
          Agregar artículo
        </ButtonLink>
      </div>
    </div>
  )
}
