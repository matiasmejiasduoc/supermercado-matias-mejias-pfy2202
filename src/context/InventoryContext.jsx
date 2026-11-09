import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { initialInventory } from '../data/initialInventory'
import { InventoryContext } from './contexts'
import { ACTIONS, inventoryReducer } from './inventoryReducer'

const STORAGE_KEY = 'supermercado-state'

const defaultState = { inventory: initialInventory, cart: [] }

const loadState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return defaultState
    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed.inventory) || !Array.isArray(parsed.cart)) return defaultState
    return parsed
  } catch {
    return defaultState
  }
}

export function InventoryProvider({ children }) {
  const [state, dispatch] = useReducer(inventoryReducer, undefined, loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      return
    }
  }, [state])

  const addProduct = useCallback(
    (product) => dispatch({ type: ACTIONS.ADD_PRODUCT, payload: product }),
    [],
  )
  const addToCart = useCallback(
    (productId, quantity) =>
      dispatch({ type: ACTIONS.ADD_TO_CART, payload: { productId, quantity } }),
    [],
  )
  const increaseQuantity = useCallback(
    (productId) => dispatch({ type: ACTIONS.INCREASE_QUANTITY, payload: productId }),
    [],
  )
  const decreaseQuantity = useCallback(
    (productId) => dispatch({ type: ACTIONS.DECREASE_QUANTITY, payload: productId }),
    [],
  )
  const removeFromCart = useCallback(
    (productId) => dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId }),
    [],
  )
  const clearCart = useCallback(() => dispatch({ type: ACTIONS.CLEAR_CART }), [])
  const resetData = useCallback(
    () => dispatch({ type: ACTIONS.RESET, payload: defaultState }),
    [],
  )

  const cartDetails = useMemo(
    () =>
      state.cart
        .map((item) => {
          const product = state.inventory.find((p) => p.id === item.productId)
          return product
            ? { ...item, product, subtotal: product.price * item.quantity }
            : null
        })
        .filter(Boolean),
    [state.cart, state.inventory],
  )

  const cartCount = useMemo(
    () => state.cart.reduce((total, item) => total + item.quantity, 0),
    [state.cart],
  )

  const cartTotal = useMemo(
    () => cartDetails.reduce((total, item) => total + item.subtotal, 0),
    [cartDetails],
  )

  const value = useMemo(
    () => ({
      inventory: state.inventory,
      cart: state.cart,
      cartDetails,
      cartCount,
      cartTotal,
      addProduct,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      resetData,
    }),
    [
      state.inventory,
      state.cart,
      cartDetails,
      cartCount,
      cartTotal,
      addProduct,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      resetData,
    ],
  )

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>
}
