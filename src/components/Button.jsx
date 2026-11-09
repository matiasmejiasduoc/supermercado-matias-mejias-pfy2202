const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-danger',
}

export default function Button({ variant = 'primary', className = '', type = 'button', ...props }) {
  return <button type={type} className={`btn ${VARIANTS[variant]} ${className}`} {...props} />
}
