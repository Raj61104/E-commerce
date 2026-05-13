import { useState } from "react";
import CartModal from "./CartModal";
import { HiShoppingCart, HiMiniPower, HiOutlineHome } from "react-icons/hi2";
import { HiMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "../Navbar.css";

function Navbar() {
    
  const [open, setOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const navigate = useNavigate();

  return (

    <div className="navbar">

      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
      >
        <HiMenu size={28} />
      </button>

      <h1
        className="mobile-title"
        onClick={() =>
          navigate("/dashboard")
        }
      >
        E-Commerce
      </h1>

      
      {open && (

        <div className="mobile-menu">

          <p
            onClick={() =>
              navigate("/dashboard")
            }
          >
            <HiOutlineHome />
          </p>

          <p
            onClick={() =>
            setShowCart(true)
          }
          >
            <HiShoppingCart />
          </p>
          {showCart && (
          
                  <CartModal
                    setShowCart={setShowCart}
                  />    
          
            )}

          <p
            onClick={() => {

              localStorage.removeItem(
                "token"
              );

              navigate("/login");

            }}
          >
            <HiMiniPower />
          </p>

        </div>

      )}

    </div>
  );
}

export default Navbar;