import { gql } from 'graphql-request'
import { shopifyClient } from './client'

// Shared by every product grid/tile. Two variants are enough to tell a
// single-variant product (quick add) from one that needs a choice.
const PRODUCT_CARD_FIELDS = gql`
  fragment ProductCardFields on Product {
    id
    title
    description
    handle
    productType
    tags
    vendor
    availableForSale
    metafields(identifiers: [
      { namespace: "custom", key: "country" }
      { namespace: "custom", key: "coffee_roast" }
    ]) {
      namespace
      key
      value
      type
    }
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
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 2) {
      edges {
        node {
          id
          availableForSale
        }
      }
    }
  }
`

const CART_FIELDS = gql`
  fragment CartFields on Cart {
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
`

const COLLECTIONS_QUERY = gql`
  ${PRODUCT_CARD_FIELDS}
  query Collections($first: Int!, $productsPerCollection: Int!, $language: LanguageCode!) @inContext(language: $language) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          products(first: $productsPerCollection) {
            edges {
              node {
                ...ProductCardFields
              }
            }
          }
        }
      }
    }
  }
`

const LATEST_PER_COLLECTION_QUERY = gql`
  ${PRODUCT_CARD_FIELDS}
  query LatestPerCollection($first: Int!, $language: LanguageCode!) @inContext(language: $language) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          products(first: 1, sortKey: CREATED, reverse: true) {
            edges {
              node {
                ...ProductCardFields
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
  ${CART_FIELDS}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
    }
  }
`

const UPDATE_CART_LINES_MUTATION = gql`
  ${CART_FIELDS}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
    }
  }
`

const REMOVE_CART_LINES_MUTATION = gql`
  ${CART_FIELDS}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
    }
  }
`

const PRODUCT_BY_HANDLE_QUERY = gql`
  query ProductByHandle($handle: String!, $language: LanguageCode!) @inContext(language: $language) {
    productByHandle(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      productType
      tags
      vendor
      category {
        id
        name
      }
      metafields(identifiers: [
        { namespace: "custom", key: "country" }
        { namespace: "custom", key: "coffee_roast" }
      ]) {
        namespace
        key
        value
        type
      }
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
      options {
        name
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

function toLanguageCode(lang) {
  return lang === 'en' ? 'EN' : 'HR'
}

function parseMetafields(metafields) {
  const result = {}
  if (!metafields) return result
  for (const mf of metafields) {
    if (mf) result[mf.key] = mf.value
  }
  return result
}

export async function fetchProductByHandle(handle, lang = 'hr') {
  const data = await shopifyClient.request(PRODUCT_BY_HANDLE_QUERY, {
    handle,
    language: toLanguageCode(lang),
  })
  const p = data.productByHandle
  if (!p) return null
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    descriptionHtml: p.descriptionHtml,
    handle: p.handle,
    productType: p.productType,
    tags: p.tags,
    vendor: p.vendor,
    metafields: parseMetafields(p.metafields),
    images: p.images.edges.map(({ node }) => node),
    price: p.priceRange.minVariantPrice,
    options: p.options.map((option) => option.name),
    variants: p.variants.edges.map(({ node }) => node),
  }
}

function mapProductNode(node) {
  return {
    id: node.id,
    title: node.title,
    description: node.description,
    handle: node.handle,
    productType: node.productType,
    tags: node.tags,
    vendor: node.vendor,
    metafields: parseMetafields(node.metafields),
    image: node.images.edges[0]?.node || null,
    price: node.priceRange.minVariantPrice,
    priceVaries: node.priceRange.minVariantPrice.amount !== node.priceRange.maxVariantPrice.amount,
    variantId: node.variants.edges[0]?.node.id,
    hasMultipleVariants: node.variants.edges.length > 1,
    availableForSale: node.availableForSale,
  }
}

export async function fetchCollections(first = 10, productsPerCollection = 50, lang = 'hr') {
  const data = await shopifyClient.request(COLLECTIONS_QUERY, {
    first,
    productsPerCollection,
    language: toLanguageCode(lang),
  })
  return data.collections.edges
    .map(({ node }) => ({
      id: node.id,
      title: node.title,
      description: node.description,
      handle: node.handle,
      products: node.products.edges.map(({ node: p }) => mapProductNode(p)),
    }))
    .filter((collection) => collection.products.length > 0)
}

// Collections that aren't coffee — kept out of the homepage "current rotation" tiles
const NON_COFFEE_COLLECTIONS = new Set([
  'frontpage',
  'equipment-and-merchandise',
  'nar-concept-store',
])

export async function fetchLatestPerCollection(first = 10, lang = 'hr') {
  const data = await shopifyClient.request(LATEST_PER_COLLECTION_QUERY, {
    first,
    language: toLanguageCode(lang),
  })
  const seen = new Set()
  const list = []
  for (const { node } of data.collections.edges) {
    if (NON_COFFEE_COLLECTIONS.has(node.handle)) continue
    const p = node.products.edges[0]?.node
    if (p && !seen.has(p.id)) {
      seen.add(p.id)
      list.push(mapProductNode(p))
    }
  }
  return list
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
