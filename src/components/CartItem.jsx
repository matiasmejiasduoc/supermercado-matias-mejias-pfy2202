import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/format'
import QuantityControl from './QuantityControl'

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const { product, quantity, subtotal } = item

  return (
    <tr>
      <td className="table-td">
        <Link to={`/productos/${product.id}`} className="font-medium text-green-700 hover:underline">
          {product.name}
        </Link>
        <p className="text-xs text-gray-500">Stock disponible: {product.stock}</p>
      </td>
      <td className="table-td">{formatPrice(product.price)}</td>
      <td className="table-td">
        <QuantityControl
          value={quantity}
          onIncrease={() => onIncrease(product.id)}
          onDecrease={() => onDecrease(product.id)}
          canIncrease={product.stock > 0}
        />
      </td>
      <td className="table-td">{formatPrice(subtotal)}</td>
      <td className="table-td text-right">
        <button type="button" className="text-sm text-red-600 hover:underline" onClick={() => onRemove(product.id)}>
          Quitar
        </button>
      </td>
    </tr>
  )
}
