import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Wrapper Component
const CheckNotLogged = ({ children }) => {
  const login = useSelector((state) => state.auth.infoCustomer);

  if (!login?.loggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default CheckNotLogged;
