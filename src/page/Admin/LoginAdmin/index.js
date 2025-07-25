import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginAdmin } from "../../../services/Api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux-setup/reducers/auth";

function LoginAdmin() {
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

    loginAdmin({
      email: inputsLogin.email,
      password: inputsLogin.password,
    })
      .then(({ data }) => {
        // const accessToken = response.data.accessToken;

        const customerInfo = {
          ...data?.data.customer,
          accessToken: data?.data.token.accessToken,
          password: inputsLogin.password,
          role: data?.data.role,
        };
        dispatch(loginSuccess(customerInfo)); //Lưu thông tin đăng nhập vào redux
        setError("");
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };
  useEffect(() => {
    document.title = "Vietpro Mobile Shop - Administrator Login";
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
      case "Admin Role Required":
        setNotification("Bạn không có quyền ADMIN để truy cập !");
        break;
      default:
        setNotification("Đăng nhập thành công !");
        break;
    }
  }, [error]);
  return (
    <>
      <div className="row">
        <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
          <div className="login-panel panel panel-default">
            <div className="panel-heading">
              Vietpro Mobile Shop - Administrator
            </div>
            <div className="panel-body">
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
              <form role="form" method="post">
                <fieldset>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="E-mail"
                      name="email"
                      type="email"
                      onChange={changeInputLogin}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Mật khẩu"
                      name="password"
                      type="password"
                      onChange={changeInputLogin}
                    />
                  </div>
                  <div className="checkbox">
                    <label>
                      <input
                        name="remember"
                        type="checkbox"
                        defaultValue="Remember Me"
                      />
                      Nhớ tài khoản
                    </label>
                  </div>
                  <button
                    type="submit"
                    onClick={clickLogin}
                    className="btn btn-primary"
                  >
                    Đăng nhập
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginAdmin;
