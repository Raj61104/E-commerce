import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "../Redux/store";

import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../Redux/Slices/cartSlice";

type CartModalProps = {
  setShowCart: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function CartModal({
  setShowCart,
}: CartModalProps) {

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const totalPrice = cartItems.reduce(

    (total, item) =>
      total + item.price * item.quantity,

    0

  );

  useEffect(() => {

    document.body.style.overflow =
      "hidden";

    return () => {

      document.body.style.overflow =
        "auto";

    };

  }, []);

  return (

    <div
      className="modal-overlay"
      onClick={() => setShowCart(false)}
    >

      <div
        className="cart-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className="close-button"
          onClick={() => setShowCart(false)}
        >
          X
        </button>

        <h2>Shopping Cart</h2>

        {cartItems.length === 0 ? (

          <h3>Cart is Empty</h3>

        ) : (

          <div>

            {cartItems.map((item) => (

              <div
                className="modal-cart-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="modal-item-content">

                  <h4>{item.title}</h4>

                  <p>${item.price}</p>

                </div>

                <div className="modal-quantity">

                  <button
                    onClick={() =>
                      dispatch(
                        decreaseQuantity(item.id)
                      )
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      dispatch(
                        increaseQuantity(item.id)
                      )
                    }
                  >
                    +
                  </button>

                </div>

              </div>

            ))}

            <h3>
              Total: ${totalPrice.toFixed(2)}
            </h3>

            <button
              className="modal-checkout-button"
              onClick={() => {

                alert("Order Placed!");

                dispatch(clearCart());

                setShowCart(false);

              }}
            >
              Checkout
            </button>

          </div>

        )}

      </div>

    </div>
  );
}