import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { logoutSuccess } from "../../../redux-setup/reducers/auth";
import { clearCart } from "../../../redux-setup/reducers/cart";
import { logoutCustomer } from "../../../services/Api";
import { persistor } from "../../../redux-setup/store"; // nơi bạn export store/persistor
function Header() {
  const login = useSelector((state) => state.auth.infoCustomer);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState();
  const changeKeyword = (e) => setKeyword(e.target.value);
  const navigate = useNavigate();
  const clickSearch = () => navigate(`/Search?keyword=${keyword}`);
  const enterSearch = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      clickSearch();
    }
  };
  const toTalCart = useSelector(({ cart }) =>
    cart.items.reduce((total, item) => total + item.qty, 0),
  );
  const currentCustomer = useSelector(
    (state) => state.auth.infoCustomer.currentCustomer,
  );
  const { pathname } = useLocation();
  const logOut = (e) => {
    e.preventDefault();
    dispatch(logoutSuccess());
    dispatch(clearCart());
    // Purge Redux Persist storage
    persistor.purge(); // Xóa tất cả dữ liệu persisted
    persistor.flush(); // Đảm bảo dữ liệu đã được xóa hoàn toàn

    // Xóa persisted state
    localStorage.removeItem("persist:auth");
    logoutCustomer(currentCustomer._id)
      .then(() => {
        navigate("/Login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div id="header">
      <div className="container">
        <div className="row">
          <div id="logo" className="col-lg-3 col-md-12 col-sm-12">
            <h1>
              <Link to="/">
                <img className="img-fluid" src="images/logo.png" />
              </Link>
            </h1>
          </div>
          <div id="search" className="col-lg-4 col-md-12 col-sm-12">
            <form className="form-inline">
              <input
                onKeyDown={enterSearch}
                onChange={changeKeyword}
                className="form-control mt-3"
                type="search"
                placeholder="Tìm kiếm"
                aria-label="Search"
              />
              <button
                onClick={clickSearch}
                className="btn btn-danger mt-3"
                type="button"
              >
                Tìm kiếm
              </button>
            </form>
          </div>
          <div id="cart" className="col-lg-5 col-md-12 col-sm-12">
            <i className="fa-solid fa-user mr-1" />
            {login?.loggedIn ? (
              <Link
                to="/Customer"
                className={
                  pathname === "/Customer" ? "text-danger mr-2" : "mr-2"
                }
              >
                {login.currentCustomer?.fullName}{" "}
              </Link>
            ) : (
              <Link
                to="/Login"
                className={pathname === "/Login" ? "text-danger mr-2" : "mr-2"}
              >
                Đăng Nhập
              </Link>
            )}
            {login?.loggedIn ? (
              <Link onClick={logOut} to="/Login" className="mr-2">
                {" "}
                | Đăng Xuất{" "}
              </Link>
            ) : (
              <Link
                to="/Register"
                className={
                  pathname === "/Register"
                    ? "text-danger mr-2 ml-2 "
                    : "mr-2 ml-2"
                }
              >
                {" "}
                | đăng ký{" "}
              </Link>
            )}
            |
            <Link
              className={
                pathname === "/Cart" || pathname === "/OrderList"
                  ? "text-danger mt-4 mr-2 ml-2 "
                  : "mt-4 mr-2 ml-2"
              }
            >
              giỏ hàng
              <ul>
                <li>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/Cart");
                    }}
                  >
                    <i className="fas fa-shopping-cart" />
                    Giỏ hàng của bạn
                  </span>
                </li>
                <li>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/OrderList");
                    }}
                  >
                    <i className="fas fa-file-alt" /> Đơn hàng đã mua
                  </span>
                </li>
              </ul>
            </Link>
            <span className="mt-3">{toTalCart}</span>
          </div>
        </div>
      </div>
      {/* Toggler/collapsibe Button */}
      <button
        className="navbar-toggler navbar-light"
        type="button"
        data-toggle="collapse"
        data-target="#menu"
      >
        <span className="navbar-toggler-icon" />
      </button>
    </div>
  );
}
export default Header;
