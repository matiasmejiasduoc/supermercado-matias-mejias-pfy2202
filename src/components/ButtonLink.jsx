import { Link } from 'react-router-dom'

const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
}

export default function ButtonLink({ variant = 'primary', className = '', ...props }) {
  return <Link className={`btn ${VARIANTS[variant]} ${className}`} {...props} />
}
