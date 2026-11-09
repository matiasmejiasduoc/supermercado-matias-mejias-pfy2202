import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import ButtonLink from '../components/ButtonLink'
import EmptyState from '../components/EmptyState'
import QuantityControl from '../components/QuantityControl'
import StockBadge from '../components/StockBadge'
import { useInventory } from '../context/useInventory'
import { getCategoryName } from '../data/categories'
import { formatPrice } from '../utils/format'

export default function ProductDetail() {
  const { productId } = useParams()
  const { inventory, cart, addToCart } = useInventory()
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')

  const product = inventory.find((item) => item.id === Number(productId))

  if (!product) {
    return (
      <EmptyState title="Artículo no encontrado">
        <ButtonLink to="/productos" variant="secondary">
          Volver al inventario
        </ButtonLink>
      </EmptyState>
    )
  }

  const inCart = cart.find((item) => item.productId === product.id)?.quantity ?? 0
  const isOutOfStock = product.stock === 0
  const selectedQuantity = Math.min(quantity, Math.max(product.stock, 1))

  const handleAddToCart = () => {
    addToCart(product.id, selectedQuantity)
    setMessage(`Se agregaron ${selectedQuantity} de "${product.name}" al carrito.`)
    setQuantity(1)
  }

  return (
    <>
      <Link to="/productos" className="text-sm text-green-700 hover:underline">
        &larr; Volver al inventario
      </Link>

      <div className="card mt-4 p-6">
        {message && (
          <div className="alert-success">
            {message} <Link to="/carrito" className="font-medium underline">Ver carrito</Link>
          </div>
        )}

        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-sm text-gray-500">{getCategoryName(product.category)}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>

        <table className="mt-6 w-full max-w-sm text-sm">
          <tbody>
            <tr>
              <td className="py-1 text-gray-500">Precio</td>
              <td className="py-1 font-medium">{formatPrice(product.price)}</td>
            </tr>
            <tr>
              <td className="py-1 text-gray-500">Unidad</td>
              <td className="py-1 font-medium">{product.unit}</td>
            </tr>
            <tr>
              <td className="py-1 text-gray-500">Stock disponible</td>
              <td className="py-1 font-medium">
                <StockBadge stock={product.stock} />
              </td>
            </tr>
            <tr>
              <td className="py-1 text-gray-500">En el carrito</td>
              <td className="py-1 font-medium">{inCart}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-gray-200 pt-4">
          <QuantityControl
            value={isOutOfStock ? 0 : selectedQuantity}
            onIncrease={() => setQuantity(selectedQuantity + 1)}
            onDecrease={() => setQuantity(selectedQuantity - 1)}
            canIncrease={!isOutOfStock && selectedQuantity < product.stock}
            canDecrease={!isOutOfStock && selectedQuantity > 1}
          />
          <Button onClick={handleAddToCart} disabled={isOutOfStock}>
            {isOutOfStock ? 'Sin stock' : 'Agregar al carrito'}
          </Button>
        </div>
      </div>
    </>
  )
}
