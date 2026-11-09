export default function StockBadge({ stock }) {
  if (stock === 0) return <span className="font-medium text-red-600">Agotado</span>
  if (stock <= 10) return <span className="font-medium text-yellow-600">{stock}</span>
  return <span>{stock}</span>
}
