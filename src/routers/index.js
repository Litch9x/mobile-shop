import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout.jsx";
import SiteLayout from "../layouts/SiteLayout.jsx";
import AdminLogin from "../layouts/AdminLogin.jsx";
import AuthRequired from "../shared/AuthRequired";

import Home from "../page/Home";
import Search from "../page/Search";
import Category from "../page/Category";
import NotFound from "../page/NotFound";
import ProductDetails from "../page/ProductDetails";
import Success from "../page/Success.js";
import Cart from "../page/Cart";
import Login from "../page/Login/index.js";
import Register from "../page/Register/index.js";
import Customer from "../page/Customer/index.js";
import OrderList from "../page/OrderList/index.js";
import OrderDetail from "../page/OrderDetail/index.js";

import CreateProduct from "../page/Admin/CreateProduct";
import ProductsList from "../page/Admin/ProductsList";
import ProductUpdate from "../page/Admin/ProductUpdate";
import CategoriesList from "../page/Admin/CategoriesList";
import CategoryUpdate from "../page/Admin/CategoryUpdate";
import CategoryCreate from "../page/Admin/CategoryCreate";
import UsersList from "../page/Admin/UsersList";
import UserUpdate from "../page/Admin/UserUpdate";
import UserCreate from "../page/Admin/UserCreate";
import Dashboard from "../page/Admin/Dashboard/index.js";
import LoginAdmin from "../page/Admin/LoginAdmin/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />, // ✅ JSX component
    children: [
      { index: true, element: <Home /> },
      { path: "Category-:id", element: <Category /> },
      { path: "ProductDetails-:id", element: <ProductDetails /> },
      { path: "Search", element: <Search /> },
      { path: "Cart", element: <Cart /> },
      { path: "Success", element: <Success /> },
      {
        path: "Register",
        element: (
          <AuthRequired.CheckLogged>
            <Register />
          </AuthRequired.CheckLogged>
        ),
      },
      {
        path: "Login",
        element: (
          <AuthRequired.CheckLogged>
            <Login />
          </AuthRequired.CheckLogged>
        ),
      },
      {
        path: "OrderList",
        element: (
          <AuthRequired.CheckNotLogged>
            <OrderList />
          </AuthRequired.CheckNotLogged>
        ),
      },
      {
        path: "OrderDetail-:id",
        element: (
          <AuthRequired.CheckNotLogged>
            <OrderDetail />
          </AuthRequired.CheckNotLogged>
        ),
      },
      {
        path: "Customer",
        element: (
          <AuthRequired.CheckNotLogged>
            <Customer />
          </AuthRequired.CheckNotLogged>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />, // ✅ JSX component
    children: [
      {
        index: true,
        element: (
          <AuthRequired.CheckAdmin>
            <Dashboard />
          </AuthRequired.CheckAdmin>
        ),
      },
      {
        path: "dashboard",
        element: (
          <AuthRequired.CheckAdmin>
            <Dashboard />
          </AuthRequired.CheckAdmin>
        ),
      },
      {
        path: "products/create",
        element: (
          <AuthRequired.CheckAdmin>
            <CreateProduct />
          </AuthRequired.CheckAdmin>
        ),
      },
      {
        path: "products",
        element: (
          <AuthRequired.CheckAdmin>
            <ProductsList />
          </AuthRequired.CheckAdmin>
        ),
      },
      {
        path: "products/:id/update",
        element: (
          <AuthRequired.CheckAdmin>
            <ProductUpdate />
          </AuthRequired.CheckAdmin>
        ),
      },
      {
        path: "categories",
        element: (
          <AuthRequired.CheckAdmin>
            <CategoriesList />
          </AuthRequired.CheckAdmin>
        ),
      },
      {
        path: "categories/create",
        element: (
          <AuthRequired.CheckAdmin>
            <CategoryCreate />
          </AuthRequired.CheckAdmin>
        ),
      },
      {
        path: "categories/:id/update",
        element: (
          <AuthRequired.CheckAdmin>
            <CategoryUpdate />
          </AuthRequired.CheckAdmin>
        ),
      },
      {
        path: "users",
        element: (
          <AuthRequired.CheckAdmin>
            <UsersList />
          </AuthRequired.CheckAdmin>
        ),
      },
      {
        path: "users/create",
        element: (
          <AuthRequired.CheckAdmin>
            <UserCreate />
          </AuthRequired.CheckAdmin>
        ),
      },
      {
        path: "users/:id/update",
        element: (
          <AuthRequired.CheckAdmin>
            <UserUpdate />
          </AuthRequired.CheckAdmin>
        ),
      },
      {
        path: "*",
        element: (
          <AuthRequired.CheckAdmin>
            <Dashboard />
          </AuthRequired.CheckAdmin>
        ),
      },
    ],
  },
  {
    path: "/admin-login",
    element: <AdminLogin />, // ✅ JSX component
    children: [
      {
        index: true,
        element: (
          <AuthRequired.CheckLoggedAdmin>
            <LoginAdmin />
          </AuthRequired.CheckLoggedAdmin>
        ),
      },
    ],
  },
]);

export default router;
