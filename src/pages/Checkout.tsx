import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../Redux/store";
import { HiMiniPower } from "react-icons/hi2";

import {
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../Redux/Slices/cartSlice";

import { useNavigate } from "react-router-dom";

export default function Checkout() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const totalPrice = cartItems.reduce(

    (total, item) =>
      total + item.price * item.quantity,

    0

  );

  return (

    <div>
      <h1
        className="title"
        onClick={() => navigate("/dashboard")}
      >
        E-Commerce Site
      </h1>
      <button
          className="Logout-button"
          onClick={() => {

            localStorage.removeItem("token");

            navigate("/login");

          }}
        >
          <HiMiniPower />
        </button>

      <div className="checkout-container">

        <h2 className="checkout-title">
          Checkout
        </h2>

        {cartItems.length === 0 ? (

          <h3 className="empty-cart">
            Cart is Empty
          </h3>

        ) : (

          <div>

            {cartItems.map((item) => (

              <div
                className="checkout-card"
                key={item.id}
              >

                <div className="checkout-image">

                  <img
                    src={item.image}
                    alt={item.title}
                  />

                </div>

                <div className="checkout-content">

                  <h3>{item.title}</h3>

                  <h4>${item.price}</h4>

                </div>

                <div className="quantity-container">

                  <button
                    onClick={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(increaseQuantity(item.id))
                    }
                  >
                    +
                  </button>

                </div>

              </div>

            ))}

            <h2 className="total-price">

              Total: ${totalPrice.toFixed(2)}

            </h2>

            <div className="checkout-btn-container">

              <button
                className="checkout-button"
                onClick={() => {

                  alert("Order Placed!");

                  dispatch(clearCart());

                }}
              >
                Checkout
              </button>

            </div>

          </div>

        )}

      </div>
    </div>
  );
}