import { Link, NavLink } from 'react-router-dom'
import { useInventory } from '../context/useInventory'

const linkClass = ({ isActive }) =>
  `rounded px-3 py-2 text-sm hover:bg-green-800 ${isActive ? 'bg-green-800' : ''}`

export default function Navbar() {
  const { cartCount } = useInventory()

  return (
    <header className="bg-green-700 text-white">
      <nav className="container-app flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="text-xl font-bold">
          SuperMercado
        </Link>
        <div className="flex flex-wrap gap-1">
          <NavLink to="/" end className={linkClass}>
            Inicio
          </NavLink>
          <NavLink to="/productos" end className={linkClass}>
            Inventario
          </NavLink>
          <NavLink to="/productos/nuevo" className={linkClass}>
            Agregar artículo
          </NavLink>
          <NavLink to="/carrito" className={linkClass}>
            Carrito ({cartCount})
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
