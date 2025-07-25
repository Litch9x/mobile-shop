import { useNavigate } from "react-router-dom";
import { orderList, orderCancel } from "../../services/Api";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../../shared/untils";
import { PAGINATION_LIMIT, STRING_PAGINATION } from "../../shared/constant/App";
import { useParams, useSearchParams } from "react-router-dom";
import Pagination from "../../shared/component/Pagination";
import moment from "moment";
function Order() {
  const [oderList, setOrderList] = useState([]);
  const [oderID, setOrderID] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [SearchParams, setSearchParams] = useSearchParams();
  const page = Number(SearchParams.get(STRING_PAGINATION)) || 1;
  const [pages, setPages] = useState({});
  const clickHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const displayStatus = (status) => {
    if (status === "cancelled") {
      return "Đã hủy đơn";
    } else if (status === "shipping") {
      return "Đơn đang giao";
    } else if (status === "delivered") {
      return "Đơn đã giao";
    }
  };
  const displayAlert = (status) => {
    if (status === "cancelled") {
      return "alert-danger cart-item row";
    } else if (status === "shipping") {
      return " cart-item row";
    } else if (status === "delivered") {
      return "alert-success cart-item row";
    }
  };

  const viewDetailOrder = (id) => {
    navigate(`/OrderDetail-${id}`);
  };

  const customerInfo = useSelector(
    ({ auth }) => auth.infoCustomer.currentCustomer,
  );

  const clickCancelOrder = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm("Bạn có muốn hủy đơn hàng ?");
    return isConfirm
      ? orderCancel(id)
          .then(() => setOrderID(id))
          .catch((error) => console.log(error))
      : false;
  };

  // const tokenRefreshedFlag = useSelector(({auth}) => auth.infoCustomer.tokenRefreshed);

  useEffect(() => {
    document.title = "Order List";
    orderList(customerInfo._id, {
      params: {
        page: page,
        limit: PAGINATION_LIMIT,
      },
    })
      .then(({ data }) => {
        setOrderList(data.data);
        setPages(data.pages);
      })
      .catch((error) => console.log(error));
  }, [oderID, page]);

  return (
    <div id="my-cart">
      <div className="row">
        <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
          Đơn hàng của bạn
        </div>
        <div className="cart-nav-item col-lg-5 col-md-5 col-sm-12">
          Tổng tiền
        </div>
      </div>
      <form method="post">
        {oderList.map((item, index) => (
          <div key={index} className={displayAlert(item?.status)}>
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
              <h4>
                Đơn hàng đã mua vào ngày:{" "}
                <span className="text-secondary">
                  {moment(item?.createdAt).fromNow()}
                </span>
              </h4>
              <p>Mã Đơn (MĐ): {item?._id}</p>
            </div>
            <div className="cart-price col-lg-2 col-md-2 col-sm-12">
              <b>{formatPrice(item?.totalPrice)}</b>
            </div>
            <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
              <button
                onClick={() => viewDetailOrder(item?._id)}
                type="button"
                className="btn btn-outline-dark mb-1"
              >
                Chi tiết đơn hàng
              </button>
              {item?.status === "shipping" && (
                <button
                  onClick={() => clickCancelOrder(item?._id)}
                  type="button"
                  className=" btn dang btn-outline-danger mb-1"
                >
                  Huỷ đơn
                </button>
              )}
              <button
                type="button"
                className={
                  item?.status === "cancelled"
                    ? "btn-danger btn  mb-1"
                    : "btn btn-outline-success mb-1"
                }
              >
                {displayStatus(item?.status)}
              </button>
            </div>
          </div>
        ))}
        <div id="pagination">
          <Pagination pages={pages} />
        </div>

        <div className="row">
          <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
            <button
              onClick={clickHome}
              id="update-cart"
              className="btn btn-success"
              type="submit"
              name="sbm"
            >
              Quay về trang chủ
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Order;
