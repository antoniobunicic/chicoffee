import { gql } from 'graphql-request'
import { shopifyClient } from './client'

const PRODUCTS_QUERY = gql`
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`

const CREATE_CART_MUTATION = gql`
  mutation CartCreate {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }
`

const ADD_TO_CART_MUTATION = gql`
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const UPDATE_CART_LINES_MUTATION = gql`
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const REMOVE_CART_LINES_MUTATION = gql`
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const PRODUCT_BY_HANDLE_QUERY = gql`
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`

export async function fetchProductByHandle(handle) {
  const data = await shopifyClient.request(PRODUCT_BY_HANDLE_QUERY, { handle })
  const p = data.productByHandle
  if (!p) return null
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    descriptionHtml: p.descriptionHtml,
    handle: p.handle,
    images: p.images.edges.map(({ node }) => node),
    price: p.priceRange.minVariantPrice,
    variants: p.variants.edges.map(({ node }) => node),
  }
}

export async function fetchProducts(first = 20) {
  const data = await shopifyClient.request(PRODUCTS_QUERY, { first })
  return data.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    description: node.description,
    handle: node.handle,
    image: node.images.edges[0]?.node || null,
    price: node.priceRange.minVariantPrice,
    variantId: node.variants.edges[0]?.node.id,
  }))
}

export async function createCart() {
  const data = await shopifyClient.request(CREATE_CART_MUTATION)
  return data.cartCreate.cart
}

function parseCartLines(cart) {
  return {
    ...cart,
    lines: cart.lines.edges.map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      variantId: node.merchandise.id,
      title: node.merchandise.product.title,
      handle: node.merchandise.product.handle,
      variantTitle: node.merchandise.title,
      price: node.merchandise.price,
      image: node.merchandise.product.images.edges[0]?.node || null,
    })),
  }
}

export async function addToCart(cartId, variantId, quantity = 1) {
  const data = await shopifyClient.request(ADD_TO_CART_MUTATION, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  })
  return parseCartLines(data.cartLinesAdd.cart)
}

export async function updateCartLine(cartId, lineId, quantity) {
  const data = await shopifyClient.request(UPDATE_CART_LINES_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  })
  return parseCartLines(data.cartLinesUpdate.cart)
}

export async function removeCartLine(cartId, lineId) {
  const data = await shopifyClient.request(REMOVE_CART_LINES_MUTATION, {
    cartId,
    lineIds: [lineId],
  })
  return parseCartLines(data.cartLinesRemove.cart)
}
