import { useEffect, useState } from "react";
import { createUser } from "../../../services/Api";
import { useNavigate } from "react-router-dom";

function UserCreate() {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    fullName: "", // Giá trị mặc định cho is_stock
    email: "",
    password: "",
    re_password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const changeInput = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn form submit mặc định

    if (inputs.password !== inputs.re_password) {
      setError("Password Invalid");
      return false;
    }
    const formData = new FormData();
    formData.append("fullName", inputs.fullName);
    formData.append("email", inputs.email);
    formData.append("password", inputs.password);
    formData.append("role", inputs.role);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    // Gọi API để tạo sản phẩm với dữ liệu FormData
    createUser(formData)
      .then(({ data }) => {
        setError("sucess");
       navigate("/admin/users");
        //navigate("/admin/users");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  useEffect(() => {
    document.title = "Create New User";

    switch (error) {
      case "Email Existed":
        setMessage(`Email ${inputs.email} đã được sử dụng đăng ký user`);
        break;

      case "Password Invalid":
        setMessage("Mật khẩu không khớp !");
        break;
      default:
        setMessage("Tạo tài khoản thành công");
        break;
    }
  }, [error]);
  return (
    <>
      <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
        <div className="row">
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <svg className="glyph stroked home">
                  <use xlinkHref="#stroked-home" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#">Quản lý thành viên</a>
            </li>
            <li className="active">Thêm thành viên</li>
          </ol>
        </div>
        {/*/.row*/}
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">Thêm thành viên</h1>
          </div>
        </div>
        {/*/.row*/}
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="col-md-8">
                  {error && <div className="alert alert-danger">{message}</div>}
                  <form onSubmit={handleSubmit} role="form" method="post">
                    <div className="form-group">
                      <label>Họ &amp; Tên</label>
                      <input
                        name="fullName"
                        onChange={changeInput}
                        value={inputs.fullName}
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        name="email"
                        onChange={changeInput}
                        value={inputs.email}
                        required
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Mật khẩu</label>
                      <input
                        name="password"
                        onChange={changeInput}
                        value={inputs.password}
                        required
                        type="password"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Nhập lại mật khẩu</label>
                      <input
                        onChange={changeInput}
                        value={inputs.re_password}
                        name="re_password"
                        required
                        type="password"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Quyền</label>
                      <select
                        name="role"
                        className="form-control"
                        onChange={changeInput}
                        value={inputs.role}
                      >
                        <option value="admin">ADMIN</option>
                        <option value="user">USER</option>
                      </select>
                    </div>
                    <button
                      name="sbm"
                      type="submit"
                      className="btn btn-success"
                    >
                      Thêm mới
                    </button>
                    <button type="reset" className="btn btn-default">
                      Làm mới
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* /.col*/}
        </div>
        {/* /.row */}
      </div>{" "}
      {/*/.main*/}
    </>
  );
}
export default UserCreate;
