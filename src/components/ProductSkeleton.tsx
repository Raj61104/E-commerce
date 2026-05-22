import { useNavigate } from "react-router-dom";
// import useLoader from "./Hooks/useLoader";



export default function ProductSkeleton(){

    const navigate = useNavigate();

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

        <div className="details-container">

          <div className="details-image">

            <div className="skeleton-image"></div>

          </div>

          <div className="details-content">

            <div className="skeleton-title"></div>

            <div className="skeleton-price"></div>

            <div className="skeleton-description"></div>

            <div className="skeleton-description short"></div>

            <div className="skeleton-button"></div>

          </div>

        </div>

      </div>

    );
}