// Shopify Storefront API types

export interface ShopifyImage {
  url: string
  altText: string | null
  width: number
  height: number
}

export interface ShopifyMoney {
  amount: string
  currencyCode: string
}

export interface ShopifyPriceRange {
  minVariantPrice: ShopifyMoney
  maxVariantPrice: ShopifyMoney
}

export interface ShopifyVariant {
  id: string
  title: string
  availableForSale: boolean
  quantityAvailable: number
  price: ShopifyMoney
  selectedOptions: { name: string; value: string }[]
  image?: ShopifyImage
}

export interface ShopifyProduct {
  id: string
  handle: string
  title: string
  description: string
  vendor: string
  images: { edges: { node: ShopifyImage }[] }
  priceRange: ShopifyPriceRange
  compareAtPriceRange: ShopifyPriceRange | null
  variants: { edges: { node: ShopifyVariant }[] }
}

export interface ShopifyCollection {
  id: string
  handle: string
  title: string
  description?: string
  image?: ShopifyImage
}

export interface ShopifyCartLine {
  node: {
    id: string
    quantity: number
    merchandise: {
      id: string
      title: string
      price: ShopifyMoney
      image: ShopifyImage | null
      product: { handle: string; title: string }
    }
  }
}

export interface ShopifyCart {
  id: string | null
  checkoutUrl: string | null
  estimatedCost: {
    subtotalAmount: ShopifyMoney
    totalAmount: ShopifyMoney
    totalTaxAmount: ShopifyMoney | null
    totalDutyAmount: ShopifyMoney | null
  }
  lines: {
    edges: ShopifyCartLine[]
  }
}
