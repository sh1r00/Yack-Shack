
import { ApolloClient, from, ApolloLink, Observable } from '@apollo/client/core/index.js';
import { createHttpLink } from '@apollo/client/link/http/index.js';
import { InMemoryCache } from '@apollo/client/cache/index.js';
import {
  DefaultApolloClient,
  provideApolloClient,
} from "@vue/apollo-composable";
import { defineNuxtPlugin } from "#app";
import { resolve as resolveMock } from "~/utils/mockCatalog";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const demoMode = runtimeConfig.public.DEMO_MODE === true || runtimeConfig.public.DEMO_MODE === 'true'
  const shopifyStorefrontEndpoint = runtimeConfig.public.SHOPIFY_STOREFRONT_ENDPOINT
  const shopifyStorefronAccessToken = runtimeConfig.public.SHOPIFY_STOREFRONT_ACCESS_TOKEN

  const httpLink = createHttpLink({
    credentials: "omit",
    uri: shopifyStorefrontEndpoint,
    headers: {
      "X-Shopify-Storefront-Access-Token":
        shopifyStorefronAccessToken,
    },
  });

  // DEMO link — serves the spoofed yak-fur catalog without hitting Shopify.
  // Operation names map to the queries/mutations in apollo/*.
  const demoLink = new ApolloLink((operation) => {
    return new Observable((observer) => {
      const data = resolveMock(operation.operationName, operation.variables || {});
      observer.next({ data });
      observer.complete();
    });
  });

  const cache = new InMemoryCache();

  let apolloClient: ApolloClient<any>;

  if (process.server) {
    apolloClient = new ApolloClient({
      ssrMode: true,
      link: demoMode ? demoLink : httpLink,
      cache,
    });
    nuxtApp.hook("app:rendered", () => {
      nuxtApp.payload.data.apollo = apolloClient.extract();
    });
  } else {
    apolloClient = new ApolloClient({
      link: demoMode ? demoLink : httpLink,
      cache,
    });
  }

  provideApolloClient(apolloClient);
  nuxtApp.provide("apollo", { DefaultApolloClient, apolloClient });
});
