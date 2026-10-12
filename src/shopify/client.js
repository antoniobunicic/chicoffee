import { GraphQLClient } from 'graphql-request'

const domain = import.meta.env.VITE_SHOPIFY_DOMAIN
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN

export const shopifyClient = new GraphQLClient(
  `https://${domain}/api/2026-07/graphql.json`,
  {
    headers: {
      'X-Shopify-Storefront-Access-Token': token,
      'Content-Type': 'application/json',
    },
  }
)
