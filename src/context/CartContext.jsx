import { createContext, useContext, useReducer, useCallback } from 'react'
import { createCart, addToCart, updateCartLine, removeCartLine } from '../shopify/queries'

const CartContext = createContext(null)

const initialState = {
  cartId: null,
  checkoutUrl: null,
  lines: [],
  isOpen: false,
  loading: false,
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        cartId: action.cart.id,
        checkoutUrl: action.cart.checkoutUrl,
        lines: action.cart.lines || [],
        loading: false,
      }
    case 'SET_LOADING':
      return { ...state, loading: true }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const ensureCart = useCallback(async () => {
    if (state.cartId) return state.cartId
    const cart = await createCart()
    dispatch({ type: 'SET_CART', cart: { ...cart, lines: [] } })
    return cart.id
  }, [state.cartId])

  const addItem = useCallback(async (variantId, quantity = 1) => {
    dispatch({ type: 'SET_LOADING' })
    const cartId = await ensureCart()
    const cart = await addToCart(cartId, variantId, quantity)
    dispatch({ type: 'SET_CART', cart })
    dispatch({ type: 'OPEN_CART' })
  }, [ensureCart])

  const updateItem = useCallback(async (lineId, quantity) => {
    if (!state.cartId) return
    dispatch({ type: 'SET_LOADING' })
    const cart = await updateCartLine(state.cartId, lineId, quantity)
    dispatch({ type: 'SET_CART', cart })
  }, [state.cartId])

  const removeItem = useCallback(async (lineId) => {
    if (!state.cartId) return
    dispatch({ type: 'SET_LOADING' })
    const cart = await removeCartLine(state.cartId, lineId)
    dispatch({ type: 'SET_CART', cart })
  }, [state.cartId])

  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), [])
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), [])

  const itemCount = state.lines.reduce((sum, line) => sum + line.quantity, 0)

  return (
    <CartContext.Provider value={{
      ...state,
      itemCount,
      addItem,
      updateItem,
      removeItem,
      toggleCart,
      closeCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
