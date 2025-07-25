import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CheckLoggedAdmin = ({ children }) => {
  const login = useSelector((state) => state.auth.infoCustomer);
  const [redirectTo, setRedirectTo] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (login?.loggedIn) {
      const role = login?.currentCustomer?.role;
      if (role === "admin") {
        setRedirectTo("/admin/dashboard");
      } else {
        setShowMessage(true); // hiển thị thông báo
        setTimeout(() => {
          setRedirectTo("/Customer");
        }, 2000); // sau 2 giây thì redirect
      }
    }
  }, [login]);

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  if (showMessage) {
    return (
      <div className="text-red-500 text-center mt-10">
        ⚠️ Bạn không có quyền truy cập vào trang này. Đang chuyển hướng...
      </div>
    );
  }

  return children;
};

export default CheckLoggedAdmin;
