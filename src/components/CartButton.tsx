import { useDispatch, useSelector } from "react-redux";
import { HiOutlineTrash, HiOutlineMinusSmall, HiMiniPlus } from "react-icons/hi2";
import { addToCart, increaseQuantity, decreaseQuantity } from "../Redux/Slices/cartSlice";
import type { RootState } from "../Redux/store";

type CartButtonProps = {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
};

export default function CartButton({
  product,
}: CartButtonProps) {

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );

  const quantity = cartItem ? cartItem.quantity : 0;

  return (

    <div>

      {quantity === 0 ? (

        <button
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>

      ) : (

        <div>

          <button
            onClick={() =>
              dispatch(decreaseQuantity(product.id))
            }
          >
            {quantity === 1 ? <HiOutlineTrash /> : <HiOutlineMinusSmall />}
          </button>

          <span> {quantity} </span>

          <button
            onClick={() =>
              dispatch(increaseQuantity(product.id))
            }
          >
            <HiMiniPlus />
          </button>

        </div>

      )}

    </div>
  );
}