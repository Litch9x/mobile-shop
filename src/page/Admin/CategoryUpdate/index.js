import { useEffect, useState } from "react";
import { updateCategory, categoryDetail } from "../../../services/Api";
import { useNavigate, useParams } from "react-router-dom";

function CategoryUpdate() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    name: "", // Giá trị mặc định cho is_stock
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

    const formData = new FormData();
    formData.append("name", inputs.name);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    // Gọi API để tạo sản phẩm với dữ liệu FormData
    updateCategory(id, formData)
      .then(({ data }) => {
        setError("sucsess");
        navigate("/admin/categories");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  useEffect(() => {
    document.title = "Update Category";
    categoryDetail(id)
      .then(({ data }) => {
        setInputs(data.data);
      })
      .catch();
    switch (error) {
      case "Category Existed":
        setMessage(`Danh mục "${inputs.name}" đã tồn tại`);
        break;
      default:
        setMessage("Cập nhật thành công");
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
              <a href="#">Quản lý danh mục</a>
            </li>
            <li className="active">Danh mục {inputs.name}</li>
          </ol>
        </div>
        {/*/.row*/}
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">Danh mục:{inputs.name} </h1>
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
                      <label>Tên danh mục:</label>
                      <input
                        type="text"
                        name="name"
                        onChange={changeInput}
                        value={inputs.name}
                        required
                        className="form-control"
                        placeholder="Tên danh mục..."
                      />
                    </div>
                    <button
                      type="submit"
                      name="sbm"
                      className="btn btn-primary"
                    >
                      Cập nhật
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
        </div>{" "}
        {/*/.main*/}
      </div>
    </>
  );
}
export default CategoryUpdate;
