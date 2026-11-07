import { defineStore } from "pinia";
import { useApolloClient } from "@vue/apollo-composable";
import { shopQuery } from "~/apollo/queries/shop";
import { collectionsQuery } from "~/apollo/queries/collections"

export const useShopStore = defineStore("shop", {
  state: () => {
    return {
      modal: {
        isOpen: false,
        modalComponent: '',
      },
      burgerOpen: false,
      name: null,
      description: null,
      loading: false,
      collections: [],
      localization: {
        country: {
          currency: {
            isoCode: "USD",
          },
        },
      },
      menuOpen: false,
      moneyFormat: "$",
    };
  },
  actions: {
    async getShopGlobals() {
      try {
        this.loading = true;
        const { resolveClient } = useApolloClient();
        const apolloClient = resolveClient();
        if (!apolloClient) {
          throw 'apollo client error'
        }

        const { data } = await apolloClient.query({
          query: shopQuery,
        });

        if (!data.shop) {
          throw "getShopData: no response";
        }

        const newCollections = await apolloClient.query({
          query: collectionsQuery,
        })
        this.name = data?.shop?.name ?? "";
        this.description = data?.shop?.description ?? "";
        this.moneyFormat = data?.shop?.moneyFormat ?? "$";
        this.localization = data?.localization ?? {};
        this.collections = newCollections.data?.collections ?? [];
      } catch (e) {
        throw e;
      } finally {
        this.loading = false;
      }
    },
    toggleBurger(state?: boolean) {
      if (typeof state === "boolean") {
        this.burgerOpen = state;
      } else {
        this.burgerOpen = !this.burgerOpen;
      }
    },
    toggleModal(toggleItem:string){
      if (toggleItem === 'close' || toggleItem === this.modal.modalComponent) {
        this.modal = {
          isOpen: false,
          modalComponent: '',
        }
        return
      }
      if (toggleItem !== this.modal.modalComponent && this.modal.isOpen === true) {
        this.modal.modalComponent = toggleItem
        return
      }
      if (toggleItem === 'HamburgerMenu') {
        this.burgerOpen = !this.burgerOpen
        return
      }
      this.modal = {
        isOpen: !this.modal.isOpen,
        modalComponent: toggleItem
      }
    },
  }
});
