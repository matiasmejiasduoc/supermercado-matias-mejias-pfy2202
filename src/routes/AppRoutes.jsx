import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

const Home = lazy(() => import('../pages/Home'))
const ProductList = lazy(() => import('../pages/ProductList'))
const ProductDetail = lazy(() => import('../pages/ProductDetail'))
const AddProduct = lazy(() => import('../pages/AddProduct'))
const Cart = lazy(() => import('../pages/Cart'))
const NotFound = lazy(() => import('../pages/NotFound'))

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="productos">
          <Route index element={<ProductList />} />
          <Route path="nuevo" element={<AddProduct />} />
          <Route path=":productId" element={<ProductDetail />} />
        </Route>
        <Route path="carrito" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
