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
    case 'SET_IDLE':
      return { ...state, loading: false }
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

  // Runs a cart mutation and always clears `loading`, so one failed request
  // can't leave every cart button disabled. Resolves to whether it succeeded.
  const runCartAction = useCallback(async (action) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const cart = await action()
      dispatch({ type: 'SET_CART', cart })
      return true
    } catch (err) {
      console.error('Shopify cart error:', err)
      dispatch({ type: 'SET_IDLE' })
      return false
    }
  }, [])

  const addItem = useCallback(async (variantId, quantity = 1) => {
    const ok = await runCartAction(async () => addToCart(await ensureCart(), variantId, quantity))
    if (ok) dispatch({ type: 'OPEN_CART' })
    return ok
  }, [ensureCart, runCartAction])

  const updateItem = useCallback(async (lineId, quantity) => {
    if (!state.cartId) return false
    return runCartAction(() => updateCartLine(state.cartId, lineId, quantity))
  }, [state.cartId, runCartAction])

  const removeItem = useCallback(async (lineId) => {
    if (!state.cartId) return false
    return runCartAction(() => removeCartLine(state.cartId, lineId))
  }, [state.cartId, runCartAction])

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
