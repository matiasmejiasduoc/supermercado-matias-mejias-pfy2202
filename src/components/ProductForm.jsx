import { useState } from 'react'
import { CATEGORIES } from '../data/categories'
import Button from './Button'
import FormField from './FormField'

const EMPTY_FORM = {
  name: '',
  category: '',
  price: '',
  stock: '',
  unit: 'unidad',
  description: '',
}

const validate = (values) => {
  const errors = {}
  if (values.name.trim().length < 3) errors.name = 'El nombre debe tener al menos 3 caracteres.'
  if (!values.category) errors.category = 'Selecciona una categoría.'
  if (values.price === '' || Number(values.price) <= 0) errors.price = 'Ingresa un precio mayor a 0.'
  if (values.stock === '' || Number(values.stock) < 0 || !Number.isInteger(Number(values.stock))) {
    errors.stock = 'Ingresa una cantidad entera igual o mayor a 0.'
  }
  if (values.description.trim().length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres.'
  }
  return errors
}

export default function ProductForm({ onSubmit, onCancel }) {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validate(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    onSubmit({
      name: values.name.trim(),
      category: values.category,
      price: Number(values.price),
      stock: Number(values.stock),
      unit: values.unit,
      description: values.description.trim(),
    })
    setValues(EMPTY_FORM)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card space-y-4 p-6">
      <FormField id="name" label="Nombre del artículo" error={errors.name}>
        <input id="name" name="name" className="input" value={values.name} onChange={handleChange} placeholder="Ej: Leche descremada 1 L" />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="category" label="Categoría" error={errors.category}>
          <select id="category" name="category" className="input" value={values.category} onChange={handleChange}>
            <option value="">Selecciona una categoría</option>
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="unit" label="Unidad de venta" error={errors.unit}>
          <select id="unit" name="unit" className="input" value={values.unit} onChange={handleChange}>
            <option value="unidad">Unidad</option>
            <option value="kg">Kilogramo</option>
          </select>
        </FormField>

        <FormField id="price" label="Precio (CLP)" error={errors.price}>
          <input id="price" name="price" type="number" min="1" className="input" value={values.price} onChange={handleChange} placeholder="1990" />
        </FormField>

        <FormField id="stock" label="Cantidad disponible" error={errors.stock}>
          <input id="stock" name="stock" type="number" min="0" step="1" className="input" value={values.stock} onChange={handleChange} placeholder="25" />
        </FormField>
      </div>

      <FormField id="description" label="Descripción" error={errors.description}>
        <textarea id="description" name="description" rows="3" className="input resize-none" value={values.description} onChange={handleChange} placeholder="Describe brevemente el artículo" />
      </FormField>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar artículo</Button>
      </div>
    </form>
  )
}
