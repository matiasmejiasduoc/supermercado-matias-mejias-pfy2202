import { useMemo, useState } from 'react'
import ButtonLink from '../components/ButtonLink'
import CategoryFilter from '../components/CategoryFilter'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import ProductTable from '../components/ProductTable'
import { useInventory } from '../context/useInventory'

export default function ProductList() {
  const { inventory } = useInventory()
  const [selectedCategory, setSelectedCategory] = useState('todas')

  const filteredProducts = useMemo(
    () =>
      selectedCategory === 'todas'
        ? inventory
        : inventory.filter((product) => product.category === selectedCategory),
    [inventory, selectedCategory],
  )

  return (
    <>
      <PageHeader title="Inventario" subtitle="Haz clic en un artículo para ver su detalle.">
        <ButtonLink to="/productos/nuevo">Agregar artículo</ButtonLink>
      </PageHeader>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
        <p className="text-sm text-gray-500">
          Mostrando {filteredProducts.length} de {inventory.length} artículos
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <ProductTable products={filteredProducts} />
      ) : (
        <EmptyState title="No hay artículos en esta categoría" />
      )}
    </>
  )
}
