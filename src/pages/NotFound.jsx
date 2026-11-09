import ButtonLink from '../components/ButtonLink'
import EmptyState from '../components/EmptyState'

export default function NotFound() {
  return (
    <EmptyState title="Página no encontrada">
      <ButtonLink to="/">Volver al inicio</ButtonLink>
    </EmptyState>
  )
}
