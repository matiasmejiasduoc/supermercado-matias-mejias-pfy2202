import { CATEGORIES } from '../data/categories'

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
        Categoría:
      </label>
      <select
        id="category-filter"
        className="input w-auto"
        value={selected}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="todas">Todas</option>
        {CATEGORIES.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}
