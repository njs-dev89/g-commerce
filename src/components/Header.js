import { Link } from "gatsby";
import React, { useContext } from "react";
import { FiShoppingBag } from "react-icons/fi";
import cartContext from "../context/cartContext";

function Header() {
  const [cart] = useContext(cartContext);
  return (
    <header className="bg-indigo-50 py-3 shadow">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <div className="logo">
          <h3>G commerce</h3>
        </div>
        <nav>
          <ul className="flex flex-row items-center">
            <li className="px-3">
              <Link to="/" activeClassName="activePage">
                Home
              </Link>
            </li>
            <li className="px-3">
              <Link to="/products" activeClassName="activePage">
                Products
              </Link>
            </li>
            <li className="px-3 relative bg-indigo-700 w-8 h-8 flex items-center justify-center rounded-full">
              <Link to="/cart" activeClassName="activePage">
                <span className="absolute -left-1 -top-0.5 text-white text-xs bg-blue-500 w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.reduce((itemsCount, item) => {
                    return itemsCount + item.quantity;
                  }, 0)}
                </span>
                <FiShoppingBag className="text-xl text-white" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
