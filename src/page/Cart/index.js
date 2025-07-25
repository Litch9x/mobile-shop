import { useSelector } from "react-redux";
import { getImageProduct, formatPrice } from "../../shared/untils";
import { useDispatch } from "react-redux";
import {
  updateCart,
  deleteItemCart,
  clearCart,
} from "../../redux-setup/reducers/cart";
import { useState } from "react";
import { order } from "../../services/Api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Cart() {
  useEffect(() => {
    document.title = "Cart";
  }, []);
  const items = useSelector(({ cart }) => cart.items);
  const totalPrice = items.reduce(
    (total, item) => total + item.qty * item.price,
    0,
  );
  const customerInfo = useSelector(({ auth }) => auth.infoCustomer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeQty = (e, id) => {
    const value = Number(e.target.value);
    if (value === 0) {
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm(
        "Bạn có muốn xóa sản phẩm khỏi giỏi hàng không?",
      );
      return isConfirm ? dispatch(deleteItemCart({ _id: id })) : false;
    }
    return dispatch(
      updateCart({
        _id: id,
        qty: Number(value),
      }),
    );
  };

  const loginOrder = (e) => {
    e.preventDefault();
    navigate("/Login");
  };

  const clickDeleteItemCart = (e, id) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm("Bạn có muốn xóa sản phẩm khỏi giỏi hàng không?");
    return isConfirm ? dispatch(deleteItemCart({ _id: id })) : false;
  };
  const clickClearCart = () => {
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm("Bạn có muốn xóa giỏi hàng không?");
    return isConfirm ? dispatch(clearCart()) : false;
  };

  const itemsOrder = items.map((item, index) => ({
    prd_id: item._id,
    price: item.price,
    qty: item.qty,
  }));

  const clickOrder = (e) => {
    e.preventDefault();
    const { _id, fullName, email, phone, address } =
      customerInfo.currentCustomer;
    order({
      customer_id: _id,
      totalPrice,
      items: itemsOrder,
      fullName,
      email,
      phone,
      address,
    })
      .then(() => {
        dispatch(clearCart());
        return navigate("/Success");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div>
        <div id="my-cart">
          <div className="row">
            <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
              Thông tin sản phẩm
            </div>
            <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
              Tùy chọn
            </div>
            <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
          </div>
          <form method="post">
            {items?.map((item, index) => (
              <div key={index} className="cart-item row">
                <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                  <img src={getImageProduct(item.image)} />
                  <h4>{item.name}</h4>
                </div>
                <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                  <input
                    onChange={(e) => changeQty(e, item._id)}
                    type="number"
                    id={`quantity-${index}`}
                    className="form-control form-blue quantity"
                    value={item.qty}
                  />
                </div>
                <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                  <b>
                    {Number(item?.qty * item?.price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </b>
                  <Link
                    onClick={(e) => clickDeleteItemCart(e, item._id)}
                    href="#"
                  >
                    Xóa
                  </Link>
                </div>
              </div>
            ))}

            <div className="row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12"></div>
              <div className="cart-total col-lg-2 col-md-2 col-sm-12">
                <b>Tổng cộng:</b>
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{formatPrice(totalPrice)} </b>
              </div>
            </div>

            <Link onClick={clickClearCart} href="#" className="text-danger">
              Xóa giỏ hàng
            </Link>
          </form>
        </div>
        {/*	End Cart	*/}
        {/*	Customer Info	*/}
        <div id="customer">
          <div className="row">
            {customerInfo.loggedIn ? (
              <div className="by-now col-lg-4 col-md-4 col-sm-12">
                <Link onClick={clickOrder} href="#">
                  <b>Mua ngay</b>
                  <span>Giao hàng tận nơi siêu tốc</span>
                </Link>
              </div>
            ) : (
              <div className="by-now col-lg-4 col-md-4 col-sm-12">
                <Link onClick={loginOrder} href="#">
                  <b>Đăng Nhập</b>
                  <span>Đăng nhập để mua hàng</span>
                </Link>
              </div>
            )}

            <div className="by-now col-lg-4 col-md-4 col-sm-12">
              <Link href="#">
                <b>Trả góp Online</b>
                <span>Vui lòng call (+84) 0988 550 553</span>
              </Link>
            </div>
          </div>
        </div>
        {/*	End Customer Info	*/}
      </div>
    </>
  );
}
export default Cart;
