import Button from '../components/Button'
import ButtonLink from '../components/ButtonLink'
import CartItem from '../components/CartItem'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import { useInventory } from '../context/useInventory'
import { formatPrice } from '../utils/format'

export default function Cart() {
  const { cartDetails, cartCount, cartTotal, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
    useInventory()

  if (cartDetails.length === 0) {
    return (
      <>
        <PageHeader title="Carrito de compras" />
        <EmptyState title="El carrito está vacío" description="Agrega artículos desde el detalle de cada producto.">
          <ButtonLink to="/productos">Ir al inventario</ButtonLink>
        </EmptyState>
      </>
    )
  }

  return (
    <>
      <PageHeader title="Carrito de compras" subtitle={`${cartCount} artículo(s) en el carrito`}>
        <Button variant="secondary" onClick={clearCart}>
          Vaciar carrito
        </Button>
      </PageHeader>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="table-th">Artículo</th>
              <th className="table-th">Precio</th>
              <th className="table-th">Cantidad</th>
              <th className="table-th">Subtotal</th>
              <th className="table-th" />
            </tr>
          </thead>
          <tbody>
            {cartDetails.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="px-4 py-3 text-right font-semibold" colSpan="3">
                Total
              </td>
              <td className="px-4 py-3 font-bold" colSpan="2">
                {formatPrice(cartTotal)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-4">
        <ButtonLink to="/productos" variant="secondary">
          Seguir comprando
        </ButtonLink>
      </div>
    </>
  )
}
