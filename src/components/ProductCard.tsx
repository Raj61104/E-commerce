import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartButton from "./CartButton";

type ProductProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

export default function ProductCard({
  id,
  title,
  price,
  description,
  image,
}: ProductProps) {

  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  return (

    <div
      className="card"
      onClick={() => navigate(`/product/${id}`)}
    >

      <div className="image-box">

        <img
          src={image}
          alt={title}
        />

      </div>

      <div className="title-box">

        <h2>{title}</h2>

      </div>

      <div className="content-box">

        <h3>${price}</h3>

        <p>
          {showMore
            ? description
            : description.slice(0, 100)}
        </p>

        <div className="button-container">

          <button
            onClick={(e) => {

              e.stopPropagation();

              setShowMore(!showMore);

            }}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
          >
            <CartButton
              product={{
                id,
                title,
                price,
                image,
              }}
            />
            
          </div>

        </div>

      </div>

    </div>
  );
}