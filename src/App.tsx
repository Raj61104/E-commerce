import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Routes>

      <Route path="/checkout" element={<Checkout />} />

      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/" element={<Navigate to="/Dashboard" />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  );
}

export default App;