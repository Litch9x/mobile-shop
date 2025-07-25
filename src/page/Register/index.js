import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { register } from "../../services/Api";
import { isValidVNPhoneNumber, isValidEmail } from "../../shared/untils";

function Register() {
  // Tạo state cho các trường input và thông báo
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");

  const [inputsRegister, setInputsRegister] = useState({});
  const changeInputRegister = (e) => {
    const { name, value } = e.target;
    return setInputsRegister({
      ...inputsRegister,
      [name]: value,
    });
  };

  const clickRegister = (e) => {
    e.preventDefault();
    // Kiểm tra tính hợp lệ cơ bản
    if (
      !inputsRegister.fullName ||
      !inputsRegister.email ||
      !inputsRegister.password ||
      !inputsRegister.phone ||
      !inputsRegister.address
    ) {
      setError("inputNull");
      return false;
    }
    if (!isValidEmail(inputsRegister.email)) {
      setError("inValidEmail");
      return false;
    }
    if (!isValidVNPhoneNumber(inputsRegister.phone)) {
      setError("inValidPhone");
      return false;
    }

    // Gửi dữ liệu đăng ký lên server
    register(inputsRegister)
      .then((response) => {
        setError("");
        setInputsRegister({});
        // navigate("/login");
      })
      .catch((error) => {
        // console.log(error);
        setError(error.response.data.message);
      });
  };

  // Display Notification
  useEffect(() => {
    document.title = "Register";

    switch (error) {
      case "inputNull":
        setNotification("Tất cả các trường phải được điền !");
        break;
      case "email existed!":
        setNotification("Email đăng ký đã tồn tại !");
        break;
      case "phone existed":
        setNotification("Số điện thoại đăng ký đã tồn tại !");
        break;
      case "inValidEmail":
        setNotification("Email không hợp lệ !");
        break;
      case "inValidPhone":
        setNotification("Số điện thoại không hợp lệ !");
        break;
      default:
        setNotification("Đăng ký thành công.");
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
          <Link to="/Login">{error === "" ? "Đăng nhập ngay !" : ""}</Link>
        </div>
      ) : (
        ""
      )}
      <h3 className="text-center">Đăng ký</h3>
      <form method="post">
        <div className="row">
          <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
            <input
              onChange={changeInputRegister}
              placeholder="Họ và tên (bắt buộc)"
              type="text"
              name="fullName"
              className="form-control"
              required
              value={inputsRegister.fullName || ""}
            />
          </div>
          <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
            <input
              onChange={changeInputRegister}
              value={inputsRegister.password || ""}
              placeholder="Mật khẩu (bắt buộc)"
              type="text"
              name="password"
              className="form-control"
              required
            />
          </div>
          <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
            <input
              onChange={changeInputRegister}
              placeholder="Email (bắt buộc)"
              type="text"
              name="email"
              className="form-control"
              required
              value={inputsRegister.email || ""}
            />
          </div>
          <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
            <input
              onChange={changeInputRegister}
              placeholder="Số điện thoại (bắt buộc)"
              type="text"
              name="phone"
              className="form-control"
              required
              value={inputsRegister.phone || ""}
            />
          </div>
          <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
            <input
              onChange={changeInputRegister}
              placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
              type="text"
              name="address"
              className="form-control"
              required
              value={inputsRegister.address || ""}
            />
          </div>
        </div>
      </form>
      <div className="row">
        <div className="by-now col-lg-6 col-md-6 col-sm-12">
          <a onClick={clickRegister} href="#">
            <b>Đăng ký ngay</b>
          </a>
        </div>
        <div className="by-now col-lg-6 col-md-6 col-sm-12">
          <Link href="#">
            <b>Quay về trang chủ</b>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
