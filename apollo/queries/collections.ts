import { gql } from "graphql-tag";

export const collectionsQuery = gql`
    query {
      collections(first: 10) {
        edges {
          cursor
          node {
            id
            handle
            title
          }
        }
      }
    }
`;
