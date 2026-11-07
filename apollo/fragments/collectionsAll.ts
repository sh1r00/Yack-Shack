import { gql } from "graphql-tag";

export const collectionsAll = gql`
  fragment collectionsAll on shop {
    collections(first: 10) {
      id
      title
    }
  }
`;
