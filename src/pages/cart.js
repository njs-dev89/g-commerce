import React, { useContext } from "react";
import cartContext from "../context/cartContext";
import { FaPlus, FaMinus } from "react-icons/fa";
import { CgRemove } from "react-icons/cg";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLIC_KEY);

function CartPage() {
  const [cart, dispatch] = useContext(cartContext);

  const handleClick = async () => {
    const stripe = await stripePromise;
    const body = {
      line_items: cart.map((item) => {
        return { price: item.priceId, quantity: item.quantity };
      }),
    };

    const response = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/stripeCheckout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };
  return (
    <div>
      <table class="table-auto mx-auto mt-16">
        <thead className="font-oswald bg-indigo-200">
          <tr>
            <th className="pr-4">S.No</th>
            <th className="pr-4">Image</th>
            <th className="pr-4">Product</th>
            <th className="pr-4">Single Price</th>
            <th className="pr-4">Quantity</th>
            <th>Total Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-b-2">
          {cart.map((item, idx) => {
            return (
              <tr key={item.id}>
                <td className="text-center">{idx + 1}</td>
                <td>
                  <img src={item.image} alt={item.name} />
                </td>
                <td>{item.name}</td>
                <td className="text-right pr-4">${item.unitPrice / 100}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <FaMinus
                      className="text-gray-400 cursor-pointer"
                      onClick={() =>
                        dispatch({ type: "DECREMENT_ITEM", payload: item.id })
                      }
                    />
                    {item.quantity}
                    <FaPlus
                      className="text-gray-400 cursor-pointer"
                      onClick={() =>
                        dispatch({ type: "INCREMENT_ITEM", payload: item.id })
                      }
                    />
                  </div>
                </td>
                <td>${item.totalPrice / 100}</td>
                <td>
                  <CgRemove
                    className="text-red-500 cursor-pointer"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td className="text-indigo-700 font-bold">Cart Total:</td>
          <td>
            $
            {cart.reduce((cartTotal, item) => {
              return cartTotal + item.totalPrice;
            }, 0) / 100}
          </td>
          <td>
            <button onClick={handleClick}>Proceed to checkout</button>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default CartPage;
