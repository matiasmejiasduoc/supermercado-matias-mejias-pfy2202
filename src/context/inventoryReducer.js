export const ACTIONS = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  ADD_TO_CART: 'ADD_TO_CART',
  INCREASE_QUANTITY: 'INCREASE_QUANTITY',
  DECREASE_QUANTITY: 'DECREASE_QUANTITY',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  RESET: 'RESET',
}

const updateStock = (inventory, productId, delta) =>
  inventory.map((product) =>
    product.id === productId ? { ...product, stock: product.stock + delta } : product,
  )

const findProduct = (inventory, productId) =>
  inventory.find((product) => product.id === productId)

const findCartItem = (cart, productId) => cart.find((item) => item.productId === productId)

export function inventoryReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_PRODUCT: {
      const nextId = state.inventory.reduce((max, product) => Math.max(max, product.id), 0) + 1
      return {
        ...state,
        inventory: [...state.inventory, { ...action.payload, id: nextId }],
      }
    }

    case ACTIONS.ADD_TO_CART: {
      const { productId, quantity } = action.payload
      const product = findProduct(state.inventory, productId)
      if (!product || quantity <= 0 || quantity > product.stock) return state

      const existing = findCartItem(state.cart, productId)
      const cart = existing
        ? state.cart.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
          )
        : [...state.cart, { productId, quantity }]

      return { inventory: updateStock(state.inventory, productId, -quantity), cart }
    }

    case ACTIONS.INCREASE_QUANTITY: {
      const productId = action.payload
      const product = findProduct(state.inventory, productId)
      if (!product || product.stock <= 0 || !findCartItem(state.cart, productId)) return state

      return {
        inventory: updateStock(state.inventory, productId, -1),
        cart: state.cart.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      }
    }

    case ACTIONS.DECREASE_QUANTITY: {
      const productId = action.payload
      const existing = findCartItem(state.cart, productId)
      if (!existing) return state

      const cart =
        existing.quantity === 1
          ? state.cart.filter((item) => item.productId !== productId)
          : state.cart.map((item) =>
              item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item,
            )

      return { inventory: updateStock(state.inventory, productId, 1), cart }
    }

    case ACTIONS.REMOVE_FROM_CART: {
      const productId = action.payload
      const existing = findCartItem(state.cart, productId)
      if (!existing) return state

      return {
        inventory: updateStock(state.inventory, productId, existing.quantity),
        cart: state.cart.filter((item) => item.productId !== productId),
      }
    }

    case ACTIONS.CLEAR_CART: {
      const inventory = state.cart.reduce(
        (current, item) => updateStock(current, item.productId, item.quantity),
        state.inventory,
      )
      return { inventory, cart: [] }
    }

    case ACTIONS.RESET:
      return action.payload

    default:
      return state
  }
}
