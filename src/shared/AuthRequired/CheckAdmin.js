import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CheckAdmin = ({ children }) => {
  const login = useSelector(({ auth }) => auth.infoCustomer);
  if (!login?.loggedIn) {
    return <Navigate to="/admin-login" />;
  }
  // console.log("CheckAdmin", login?.currentCustomer.role);
  const isAdmin = login?.currentCustomer.role === "admin";

  // Nếu không phải là admin, chuyển hướng về trang chủ
  if (!isAdmin) {
    return <Navigate to="/admin-login" />;
  }

  // Nếu là admin, hiển thị component con (children)
  return children;
};

export default CheckAdmin;
