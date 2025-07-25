import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { login } from "../../services/Api";
import { loginFacebook } from "../../services/Api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux-setup/reducers/auth";

function Login() {
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputsLogin, setInputsLogin] = useState({});
  const changeInputLogin = (e) => {
    const { name, value } = e.target;
    return setInputsLogin({
      ...inputsLogin,
      [name]: value,
    });
  };

  const clickLogin = (e) => {
    e.preventDefault();
    // Kiểm tra tính hợp lệ cơ bản
    if (!inputsLogin.email || !inputsLogin.password) {
      setError("inputNull");
      return false;
    }
    // Gửi dữ liệu đăng nhập lên server

    login({
      email: inputsLogin.email,
      password: inputsLogin.password,
    })
      .then(({ data }) => {
        // const accessToken = response.data.accessToken;

        const customerInfo = {
          ...data?.data.customer,
          accessToken: data?.data.token.accessToken,
          //password: inputsLogin.password,
          role: data?.data.role,
        };
        dispatch(loginSuccess(customerInfo)); //Lưu thông tin đăng nhập vào redux
        setError("");
        navigate("/Customer");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  useEffect(() => {
    document.title = "Login";
    switch (error) {
      case "inputNull":
        setNotification("Tất cả các trường phải được điền !");
        break;
      case "Email not valid":
        setNotification(" Email không chính xác hoặc chưa đăng ký tài khoản !");
        break;
      case "password not valid":
        setNotification("Đăng nhập thất bại. Mật khẩu không chính xác !");
        break;
      default:
        setNotification("Đăng nhập thành công !");
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
      <h3 className="text-center">Đăng nhập</h3>
      <form method="post">
        <div className="row">
          <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
            <input
              onChange={changeInputLogin}
              placeholder="Email (bắt buộc)"
              type="text"
              name="email"
              className="form-control"
              required
            />
          </div>
          <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
            <input
              onChange={changeInputLogin}
              placeholder="Mật khẩu (bắt buộc)"
              type="text"
              name="password"
              className="form-control"
              required
            />
          </div>
        </div>
      </form>
      <div className="row">
        <div className="by-now col-lg-6 col-md-6 col-sm-12">
          <Link>
            <b onClick={clickLogin}>Đăng nhập ngay</b>
          </Link>
        </div>
        {/* <div className="by-now col-lg-3 col-md-3 col-sm-6">
                    <Link>
                        <b onClick={clickLoginFacebook}>Đăng nhập Facebook</b>
                    </Link>
                </div> */}
        <div className="by-now col-lg-6 col-md-6 col-sm-12">
          <Link to="/">
            <b>Quay về trang chủ</b>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
