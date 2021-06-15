import { graphql } from "gatsby";
import React from "react";
import ProductsList from "../components/ProductsList";

function ProductsPage({ data }) {
  const products = data.products.nodes;
  return (
    <div>
      Product list
      <ProductsList products={products} />
    </div>
  );
}

export default ProductsPage;

export const query = graphql`
  query {
    products: allStripePrice {
      nodes {
        id
        unit_amount
        product {
          name
          description
          id
          localFiles {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
              resize(width: 50) {
                src
              }
            }
          }
        }
        currency
      }
    }
  }
`;
