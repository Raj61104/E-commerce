import "../App.css";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";
import { Navigate, useNavigate } from "react-router-dom";
import { HiShoppingCart, HiMiniPower } from "react-icons/hi2";
import PriceRange from "../components/PriceRange";
import CartModal from "../components/CartModal";
import type { Product } from "../types/product";
import Navbar from "../components/Navbar";

export default function Dashboard() {

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.data);

        const highest = Number(
          Math.max(
            ...res.data.map(
              (product: Product) =>
                product.price
            )
          ).toFixed(2)

        );

        setHighestPrice(highest);
        setMaxPrice(highest);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const priceFilteredProducts =
    products.filter((product) => {

      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );

    });

  const prices =
    priceFilteredProducts.map(
      (product) => product.price
    );

  const minPrice =
    prices.length > 0
      ? Math.min(...prices)
      : 0;

  const filteredProducts =
    priceFilteredProducts.filter(
      (product) =>
        product.price <= maxPrice
    );

  if (sortOrder === "lowToHigh") {

    filteredProducts.sort(
      (a, b) => a.price - b.price
    );

  }

  if (sortOrder === "highToLow") {

    filteredProducts.sort(
      (a, b) => b.price - a.price
    );

  }

  const token =
    localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (

    <div>

      <h1
        className="title"
        onClick={() =>
          navigate("/dashboard")
        }
      >
        E-Commerce Site
      </h1>
      <Navbar />

      <div className="search-container">

        <input
          type="text"
          placeholder="Search here"
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select

          onChange={(e) => {

            const selectedCategory =
              e.target.value;

            setCategory(
              selectedCategory
            );

            const filtered =
              products.filter(
                (product) => {

                  const matchesSearch =
                    product.title
                      .toLowerCase()
                      .includes(
                        search.toLowerCase()
                      );

                  const matchesCategory =
                    selectedCategory ===
                      "" ||
                    product.category ===
                      selectedCategory;

                  return (
                    matchesSearch &&
                    matchesCategory
                  );

                }
              );

            const newHighestPrice =
              filtered.length > 0
                ? Math.max(
                    ...filtered.map(
                      (product) =>
                        product.price
                    )
                  )
                : 0;

            setHighestPrice(
              newHighestPrice
            );

            setMaxPrice(
              newHighestPrice
            );

          }}

        >

          <option value="">
            All Categories
          </option>

          <option value="men's clothing">
            Men's Clothing
          </option>

          <option value="women's clothing">
            Women's Clothing
          </option>

          <option value="electronics">
            Electronics
          </option>

          <option value="jewelery">
            Jewelery
          </option>

        </select>

        <select
          onChange={(e) =>
            setSortOrder(
              e.target.value
            )
          }
        >

          <option value="">
            Sort By
          </option>

          <option value="lowToHigh">
            Price: Low to High
          </option>

          <option value="highToLow">
            Price: High to Low
          </option>

        </select>

        <PriceRange
          minPrice={minPrice}
          highestPrice={highestPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

      </div>

      <div>

        <button
          className="Logout-button"
          onClick={() => {

            localStorage.removeItem(
              "token"
            );

            navigate("/login");

          }}
        >
          <HiMiniPower />
        </button>

        <button
          className="Cart-page-button"
          onClick={() =>
            setShowCart(true)
          }
        >
          <HiShoppingCart />
        </button>
          
      </div>

      {showCart && (

        <CartModal
          setShowCart={setShowCart}
        />

      )}

      <div className="products-container">

        {filteredProducts.map(
          (product) => (

            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={
                product.description
              }
              image={product.image}
            />

          )
        )}

      </div>

    </div>
  );
}