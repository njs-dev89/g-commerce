import React, { useContext } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import cartContext from "../context/cartContext";

function ProductsList({ products }) {
  const [cart, dispatch] = useContext(cartContext);
  const addToCart = (data, image, unitPrice, priceId) => {
    const { id, name } = data;
    const product = cart.find((item) => item.id === data.id);
    if (product) {
      return dispatch({ type: "INCREMENT_ITEM", payload: data.id });
    }
    return dispatch({
      type: "ADD_TO_CART",
      payload: {
        id,
        name,
        image,
        quantity: 1,
        priceId,
        unitPrice,
        totalPrice: unitPrice,
      },
    });
  };
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {products.map((product) => {
        console.log(product.product.localFiles);
        const image = getImage(product.product.localFiles[0]);
        return (
          <div
            key={product.product.id}
            className="flex flex-col items-center gap-3"
          >
            <GatsbyImage image={image} alt={product.product.name} />
            <div className="flex flex-row items-baseline justify-between gap-3">
              <h2 className="text-2xl">{product.product.name}</h2>
              <h3>${product.unit_amount / 100}</h3>
            </div>
            <button
              onClick={() =>
                addToCart(
                  product.product,
                  product.product.localFiles[0].childImageSharp.resize.src,
                  product.unit_amount,
                  product.id
                )
              }
              className="rounded border-2 px-4 py-2 border-indigo-700 text-indigo-700 hover:bg-indigo-700 hover:text-white transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsList;
