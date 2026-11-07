import gql from "graphql-tag";

export const shopQuery = gql`
  query shop {
    shop {
      name
      description
      moneyFormat
    }
    localization {
      country {
        currency {
          isoCode
          name
          symbol
        }
        isoCode
        name
      }
    }
  }
`;
