import { useParams } from "react-router-dom";
import { orderDetail } from "../../services/Api";
import { useState, useEffect } from "react";
import { formatPrice } from "../../shared/untils";
import { getImageProduct } from "../../shared/untils";
function OrderDetail() {
  const { id } = useParams();
  const [orderItem, setOrderItem] = useState({});
  useEffect(() => {
    document.title = "Order Detail";

    orderDetail(id)
      .then(({ data }) => setOrderItem(data.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
            Thông tin sản phẩm
          </div>
          <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
            Số lượng
          </div>
          <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
        </div>
        <form method="post">
          {orderItem.items?.map((item, index) => (
            <div key={index} className="cart-item row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <img src={getImageProduct(item?.image)} />
                <h4>{item?.name}</h4>
              </div>
              <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                <p>{item?.qty}</p>
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{formatPrice(item?.price)}</b>
              </div>
            </div>
          ))}

          <div className="row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12"></div>
            <div className="cart-total col-lg-2 col-md-2 col-sm-12">
              <b>Tổng cộng:</b>
            </div>
            <div className="cart-price col-lg-3 col-md-3 col-sm-12">
              <b>{formatPrice(orderItem?.totalPrice)}</b>
            </div>
          </div>
        </form>
      </div>
      <div id="customer">
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="/OrderList">
              <b>Về danh sách đơn hàng</b>
            </a>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="/">
              <b>Về trang chủ</b>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderDetail;
