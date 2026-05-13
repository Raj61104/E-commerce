import { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { getProduct } from "../services/api";
import CartButton from "../components/CartButton";
import { HiMiniPower, HiShoppingCart } from "react-icons/hi2";
import CartModal from "../components/CartModal";
import type { Product } from "../types/product";
import BackButton from "../components/BackButton";

export default function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [showCart, setShowCart] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    getProduct(Number(id))
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [id]);

  if (!product) {

    return (

      <div>
        

        <h1
          className="title"
          onClick={() => navigate("/dashboard")}
        >
          E-Commerce Site
        </h1>

        <h2 className="title">
          Loading...
        </h2>

      </div>

    );
  }

  return (

    <div>

      <button
        className="Logout-button"
        onClick={() => {

          localStorage.removeItem("token");

          navigate("/login");

        }}
      >
        <HiMiniPower />
      </button>

      <BackButton />

      <button
        className="Cart-page-button"
        onClick={() => setShowCart(true)}
      >
        <HiShoppingCart />
      </button>

      <h1
        className="title"
        onClick={() => navigate("/dashboard")}
      >
        E-Commerce Site
      </h1>

      {showCart && (

        <CartModal
          setShowCart={setShowCart}
        />

      )}

      <div className="details-container">

        <div className="details-image">

          <img
            src={product.image}
            alt={product.title}
          />

        </div>

        <div className="details-content">

          <h1>{product.title}</h1>

          <h2>${product.price}</h2>

          <p>{product.description}</p>

          <CartButton
            product={{
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
            }}
          />

        </div>

      </div>

    </div>
  );
}