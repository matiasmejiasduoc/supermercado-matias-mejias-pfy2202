import { useNavigate } from 'react-router-dom'
import { getCategoryName } from '../data/categories'
import { formatPrice } from '../utils/format'
import StockBadge from './StockBadge'

export default function ProductTable({ products }) {
  const navigate = useNavigate()

  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr>
            <th className="table-th">Artículo</th>
            <th className="table-th">Categoría</th>
            <th className="table-th">Precio</th>
            <th className="table-th">Unidad</th>
            <th className="table-th">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`/productos/${product.id}`)}
            >
              <td className="table-td font-medium text-green-700">{product.name}</td>
              <td className="table-td">{getCategoryName(product.category)}</td>
              <td className="table-td">{formatPrice(product.price)}</td>
              <td className="table-td">{product.unit}</td>
              <td className="table-td">
                <StockBadge stock={product.stock} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
