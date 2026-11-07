import { defineStore } from "pinia";
import { useApolloClient } from "@vue/apollo-composable";
import { cartCreate } from "~/apollo/mutations/cartCreate";
import { cartLinesAdd } from "~/apollo/mutations/cartLinesAdd";
import { cartLinesUpdate } from "~/apollo/mutations/cartLinesUpdate";
import { cartLinesRemove } from "~/apollo/mutations/cartLinesRemove";
import { checkoutUrl } from "~/apollo/queries/checkoutUrl";
import { formatLocalePrice } from "~/utils/money";

// TO-DO: provide apolloClient to pinia as plugin
// https://pinia.vuejs.org/core-concepts/plugins.html#introduction

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cart: {
        checkoutUrl: null,
        estimatedCost: {
          subtotalAmount: {
            amount: 0,
            currencyCode: "USD",
          },
          totalTaxAmount: {
            amount: 0,
            currencyCode: "USD",
          },
          totalDutyAmount: {
            amount: 0,
            currencyCode: "USD",
          },
          totalAmount: {
            amount: 0,
            currencyCode: "USD",
          },
        },
        id: null,
        lines: {
          edges: [],
        },
      },
      loading: false,
      cartOpen: false,
    };
  },
  actions: {
    toggleCart(state?: boolean) {
      if (typeof state === "boolean") {
        return this.cartOpen = state;
      }
        return this.cartOpen = !this.cartOpen
    },
    async cartCreate() {
      try {
        this.loading = true;
        const { resolveClient } = useApolloClient();
        const apolloClient = resolveClient();
        const { data } = await apolloClient.mutate({
          mutation: cartCreate,
        });
        if (!data.cartCreate.cart.id) {
          throw "cartCreate: error";
        }
        this.cart.id = data?.cartCreate?.cart?.id ?? null;
        this.cart.checkoutUrl = data?.cartCreate?.cart?.checkoutUrl ?? null;
      } catch (e) {
        return e;
      } finally {
        this.loading = false;
      }
    },
    async getCheckoutUrl() {
      if (this.cart.checkoutUrl) {
        return this.cart.checkoutUrl;
      }
      if (!this.cart.id) {
        await this.cartCreate();
      }
      try {
        this.loading = true;
        const { resolveClient } = useApolloClient();
        const apolloClient = resolveClient();
        const { data } = await apolloClient.query({
          query: checkoutUrl,
          variables: {
            cartId: this.cart.id,
          },
        });
        if (!data.checkoutUrl.cart.checkoutUrl) {
          throw "getCheckoutUrl: error";
        }
        this.cart.checkoutUrl = data?.checkoutUrl?.cart?.checkoutUrl ?? null;
        return this.cart.checkoutUrl;
      } catch (e) {
        return e;
      } finally {
        this.loading = false;
      }
    },
    async cartLinesAdd(merchandiseId: string, quantity: number) {
      try {
        if (!this.cart.id) {
          await this.cartCreate();
        }
        const { resolveClient } = useApolloClient();
        const apolloClient = resolveClient();
        const newVar = {
          quantity,
          merchandiseId,
          cartId: this.cart.id
        }
        const { data } = await apolloClient.mutate({
          mutation: cartLinesAdd,
          variables: {
            lines: [
              {
                merchandiseId,
                quantity
              },
            ],
            cartId: this.cart.id,
          },
        });
        if (!data.cartLinesAdd) {
          throw "cartLinesAdd: error";
        }
        this.cart = data?.cartLinesAdd?.cart;
        this.cartOpen = true;
      } catch (e) {
        throw e;
      } finally {
        this.loading = false;
      }
    },
    async cartLinesUpdate(id:string, merchandiseId: string, quantity: number) {
      try {
        if (!this.cart.id) {
          await this.cartCreate();
        }
        const { resolveClient } = useApolloClient();
        const apolloClient = resolveClient();
        const { data } = await apolloClient.mutate({
          mutation: cartLinesUpdate,
          variables: {
            lines: [
              {
                id,
                merchandiseId,
                quantity
              },
            ],
            cartId: this.cart.id,
          },
        });
        if (!data.cartLinesUpdate) {
          throw "cartLinesAdd: error";
        }
        this.cart = data?.cartLinesUpdate?.cart;
        this.cartOpen = true;
      } catch (e) {
        throw e;
      } finally {
        this.loading = false;
      }
    },
    async cartLinesRemove(merchandiseId: string) {
      try {
        const { resolveClient } = useApolloClient();
        const apolloClient = resolveClient();
        const cartId = this.cart.id;
        if (!cartId) {
          throw "cartLinesRemove: no cartId";
        }
        const { data } = await apolloClient.mutate({
          mutation: cartLinesRemove,
          variables: {
            lineIds: [merchandiseId],
            cartId,
          },
        });
        if (!data.cartLinesRemove) {
          throw "cartLinesRemove: error";
        }
        this.cart = data.cartLinesRemove.cart;
      } catch (e) {
        return e;
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    lineItems: (state) => state.cart.lines.edges,
    subtotalAmount: (state): string => {
      const amount = +state.cart.estimatedCost.subtotalAmount.amount;
      const code = state.cart.estimatedCost.subtotalAmount.currencyCode;
      return formatLocalePrice(+amount, "en-US", code);
    },
    totalDutyAmount: (state): string => {
      if (!state?.cart?.estimatedCost?.totalDutyAmount) {
        return 'no duty';
      }
      const amount = +state?.cart?.estimatedCost?.totalDutyAmount?.amount;
      const code = state?.cart?.estimatedCost?.totalDutyAmount?.currencyCode;
      return formatLocalePrice(+amount, "en-US", code);
    },
    totalTaxAmount: (state): string => {
      if (!state?.cart?.estimatedCost?.totalTaxAmount) {
        return 'no Tax';
      }
      const amount = +state.cart.estimatedCost.totalTaxAmount.amount;
      const code = state.cart.estimatedCost.totalTaxAmount.currencyCode;
      return formatLocalePrice(+amount, "en-US", code);
    },
    totalAmount: (state): string => {
      const amount = +state.cart.estimatedCost.totalAmount.amount;
      const code = state.cart.estimatedCost.totalAmount.currencyCode;
      return formatLocalePrice(+amount, "en-US", code);
    },
    totalItems: (state) => {
      let totalItems = 0
      if (!state.cart.lines.edges) { 
        return totalItems
      }
      for (let x =0; x < state.cart.lines.edges.length; x++) {
        totalItems += state.cart.lines.edges[x].node.quantity
      }
      return totalItems
    }
  },
});
