import { Link } from "react-router-dom";
import { updateCustomerInfo } from "../../services/Api";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateInfo } from "../../redux-setup/reducers/auth";
import { isValidVNPhoneNumber } from "../../shared/untils";

function Customer() {
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");
  const customerInfo = useSelector(
    ({ auth }) => auth.infoCustomer.currentCustomer,
  );
  const dispatch = useDispatch();
  const [infoUpdate, setInfoUpdate] = useState({
    fullName: customerInfo.fullName,
    address: customerInfo.address,
    phone: customerInfo.phone,
  });
  const changeInput = (e) => {
    setError(null);
    const { name, value } = e.target;
    return setInfoUpdate({
      ...infoUpdate,
      [name]: value,
    });
  };

  const clickUpdateInfo = (e) => {
    e.preventDefault();
    // Kiểm tra tính hợp lệ cơ bản
    if (!infoUpdate.fullName || !infoUpdate.phone || !infoUpdate.address) {
      setError("inputNull");
      return false;
    }
    if (
      infoUpdate.fullName === customerInfo.fullName &&
      infoUpdate.phone === customerInfo.phone &&
      infoUpdate.address === customerInfo.address
    ) {
      return false;
    }

    if (!isValidVNPhoneNumber(infoUpdate.phone)) {
      setError("inValidPhone");
      return false;
    }
    // Gửi dữ liệu cập nhật lên server
    updateCustomerInfo(customerInfo._id, infoUpdate)
      .then((response) => {
        setError("");
        dispatch(updateInfo(infoUpdate));
      })
      .catch((error) => {
        // console.error("Cập Nhật thất bại", error);
        setError(error.response.data.message);
      });
  };
  useEffect(() => {
    document.title = "Customer Info";

    switch (error) {
      case "inputNull":
        setNotification("Tất cả các trường phải được điền !");
        break;
      case "Phone Existed":
        setNotification(" Số điện thoại đã tồn tại");
        break;
      case "inValidPhone":
        setNotification(" Vui lòng nhập số điện thoại hợp lệ !");
        break;
      default:
        setNotification("Cập nhật thông tin thành công!");
        break;
    }
  }, [error]);

  return (
    <div id="customer">
      {error !== null ? (
        <div
          className={
            error === ""
              ? "alert alert-success text-center"
              : "alert alert-danger text-center"
          }
        >
          {notification}
        </div>
      ) : (
        ""
      )}
      <h3 className="text-center">Thông tin tài khoản</h3>
      <form method="post">
        <div className="row">
          <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
            <input
              onChange={changeInput}
              placeholder="Họ và tên (bắt buộc)"
              type="text"
              name="fullName"
              className="form-control"
              defaultValue={customerInfo.fullName}
              required
            />
          </div>
          <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
            <input
              disabled
              placeholder="Mật khẩu (bắt buộc)"
              type="password"
              name="password"
              className="form-control"
              defaultValue={customerInfo.password}
              required
            />
          </div>
          <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
            <input
              disabled
              placeholder="Email (bắt buộc)"
              type="text"
              name="email"
              className="form-control"
              defaultValue={customerInfo.email}
              required
            />
          </div>
          <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
            <input
              onChange={changeInput}
              placeholder="Số điện thoại (bắt buộc)"
              type="text"
              name="phone"
              className="form-control"
              defaultValue={customerInfo.phone}
              required
            />
          </div>
          <div id="customer-add" className="col-lg-6 col-md-6 col-sm-12">
            <input
              onChange={changeInput}
              placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
              type="text"
              name="address"
              className="form-control"
              defaultValue={customerInfo.address}
              required
            />
          </div>
          <div id="customer-role" className="col-lg-6 col-md-6 col-sm-12">
            <input
              disabled
              placeholder="Role "
              type="text"
              name="role"
              className="form-control"
              defaultValue={`Quyền truy cập: < ${customerInfo.role} >`}
              required
            />
          </div>
        </div>
      </form>
      <div className="row">
        <div className="by-now col-lg-6 col-md-6 col-sm-12">
          <Link>
            <b onClick={clickUpdateInfo}>Cập nhật ngay</b>
          </Link>
        </div>
        <div className="by-now col-lg-6 col-md-6 col-sm-12">
          <Link to="/">
            <b>Quay về trang chủ</b>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Customer;
