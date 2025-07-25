import { useEffect, useState } from "react";
import { createCategory, categoryDetail } from "../../../services/Api";
import { useNavigate } from "react-router-dom";

function CategoryCreate() {
  const [categories, setCategories] = useState({});
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
    createCategory(formData)
      .then(({ data }) => {
        setCategories(data)

        setError("sucess");
    
       navigate("/admin/categories")
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  useEffect(() => {
    document.title = "Create Category";

    switch (error) {
      case "Category Existed":
        setMessage(`Danh mục " ${inputs.name}" đã tồn tại`);
        break;

      default:
        setMessage("Tạo danh mục mới thành công");
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
            <li className="active">Thêm danh mục</li>
          </ol>
        </div>
        {/*/.row*/}
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">Thêm danh mục</h1>
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
        </div>{" "}
        {/*/.main*/}
      </div>
    </>
  );
}
export default CategoryCreate;
