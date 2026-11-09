import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProductForm from '../components/ProductForm'
import { useInventory } from '../context/useInventory'

export default function AddProduct() {
  const { addProduct } = useInventory()
  const navigate = useNavigate()
  const [lastAdded, setLastAdded] = useState('')

  const handleSubmit = (product) => {
    addProduct(product)
    setLastAdded(product.name)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Agregar artículo" />

      {lastAdded && (
        <div className="alert-success">
          El artículo "{lastAdded}" se agregó al inventario.{' '}
          <Link to="/productos" className="font-medium underline">Ver inventario</Link>
        </div>
      )}

      <ProductForm onSubmit={handleSubmit} onCancel={() => navigate('/productos')} />
    </div>
  )
}
