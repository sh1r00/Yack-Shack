import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => {
    return {
      selectedVariant: {
        id: null,
        title: 'Pick a Variant',
        availableForSale: false,
        quantity: 0,
        quantityAvailable: 0,
      }
    }
  },
  actions: {
    setSelectedVariant(variant: {id: any, title: string, availableForSale: boolean, quantity: number, quantityAvailable: number}) {
      this.selectedVariant = variant;
    },
    setSelectedVariantQuantity(quantity: number) {
      this.selectedVariant.quantity = quantity;
    },
  },
  getters: {
    getSelectedVariant(state) {
      return state.selectedVariant
    },
  }
});
