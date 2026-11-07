import { gql } from "graphql-tag";

export const searchProductsByFilter = gql`
  query collection(
    $filter: String
    $numProducts: Int
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: "filtereable-collection") {
      handle
      products(
        first: $numProducts,
        sortKey: $sortKey,
        reverse: $reverse,
        filters: $filter
      ) {
        edges {
          cursor
          node {
            availableForSale
            compareAtPriceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            description
            handle
            id
            images(first: 2) {
              edges {
                node {
                  height
                  id
                  url
                  width
                }
              }
            }
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            productType
            tags
            seo {
              title
              description
            }
            title
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  sku
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;
