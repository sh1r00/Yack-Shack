import { defineStore } from "pinia";
import { useApolloClient } from "@vue/apollo-composable";
import { searchProductsByFilter } from "~/apollo/queries/searchProductsByFilter";

export const useSearchStore = defineStore("search", {
  state: () => {
    return {
      search: {
        searchTerm: '',
        searchResult: ''
      },
      loading: false
    }
  },
  actions: {
    async searchProductsByFilter(filter: string) {
      const queryFilter = `title:${filter} OR description:${filter} OR tags:${filter}`
      try {
        const { resolveClient } = useApolloClient();
        const apolloClient = resolveClient();
        const { data } = await apolloClient.query({
          query: searchProductsByFilter,
          variables: {
            queryFilter
          }
        });
        this.search.searchTerm = filter
        this.search.searchResult = data;
      } catch (e) {
        throw e;
      } finally {
        this.loading = false;
      }
    },
  }
})