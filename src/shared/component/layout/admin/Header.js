import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { logoutSuccess } from "../../../../redux-setup/reducers/auth";
import { clearCart } from "../../../../redux-setup/reducers/cart";
import { logoutCustomer } from "../../../../services/Api";
import { persistor } from "../../../../redux-setup/store"; // nơi bạn export store/persistor
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
    logoutCustomer()
      .then(() => {
        navigate("/admin-login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#sidebar-collapse"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="#">
              <span>Vietpro</span>Shop
            </a>
            <ul className="user-menu">
              <li className="dropdown pull-right">
                <i className="fa-solid fa-user mr-1" />
                <Link to="/admin/dashboard" className="mr-2 admin-name">
                  {" "}
                  {login.currentCustomer?.fullName}{" "}
                </Link>
                <a href="" onClick={logOut} className="logout-btn">
                  Đăng xuất
                </a>
                <ul className="dropdown-menu" role="menu"></ul>
              </li>
            </ul>
          </div>
        </div>
        {/* /.container-fluid */}
      </nav>
    </>
  );
}
export default Header;
