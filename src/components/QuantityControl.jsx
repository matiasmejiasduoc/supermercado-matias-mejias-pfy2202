export default function QuantityControl({ value, onIncrease, onDecrease, canIncrease = true, canDecrease = true }) {
  const buttonClass = 'h-8 w-8 border border-gray-300 bg-white hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <div className="inline-flex items-center">
      <button type="button" className={`${buttonClass} rounded-l`} onClick={onDecrease} disabled={!canDecrease}>
        -
      </button>
      <span className="h-8 w-10 border-y border-gray-300 bg-white text-center text-sm leading-8">{value}</span>
      <button type="button" className={`${buttonClass} rounded-r`} onClick={onIncrease} disabled={!canIncrease}>
        +
      </button>
    </div>
  )
}
