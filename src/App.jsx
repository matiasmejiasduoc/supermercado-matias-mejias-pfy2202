import { HashRouter } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { InventoryProvider } from './context/InventoryContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <InventoryProvider>
      <HashRouter>
        <ScrollToTop />
        <AppRoutes />
      </HashRouter>
    </InventoryProvider>
  )
}
