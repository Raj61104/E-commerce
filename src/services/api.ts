import axios from "axios";

// products
export const getProducts = () =>
  axios.get("https://fakestoreapi.com/products");

export const getProduct = (id: number) =>
  axios.get(`https://fakestoreapi.com/products/${id}`);

// carts
export const getCarts = () =>
  axios.get("https://fakestoreapi.com/carts"); 

// users
export const getUsers = () =>
  axios.get("https://fakestoreapi.com/users");

// login
export const loginUser = (username: string, password: string) =>
  axios.post("https://fakestoreapi.com/auth/login", {
    username,
    password,
  });
