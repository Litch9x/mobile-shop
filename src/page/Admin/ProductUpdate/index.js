import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  productDetail,
  updateProduct,
  getCategories,
} from "../../../services/Api";
import { useParams } from "react-router-dom";
import { getImageProduct, formatPrice } from "../../../shared/untils";

function ProductUpdate() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [inputs, setInputs] = useState({
    is_stock: true, // Giá trị mặc định cho is_stock
    is_featured: false,
    name: "",
    price: "",
    detail: "",
    category_id: "",
    status: "",
    promotion: "",
    accessories: "",
    details: "",
  });
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // state để lưu ảnh đã chọn
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Lấy file đầu tiên trong mảng files
    if (file) {
      setImage(file); // Lưu file vào state thay vì Data URL
    }
  };

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
    formData.append("price", inputs.price);
    formData.append("details", inputs.details);
    formData.append("category_id", inputs.category_id);
    formData.append("status", inputs.status);
    formData.append("is_featured", inputs.is_featured); // Boolean
    formData.append("promotion", inputs.promotion);
    formData.append("accessories", inputs.accessories);
    formData.append("is_stock", inputs.is_stock); // Boolean
    formData.append("file", image); // Ảnh sản phẩm
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    // Gọi API để tạo sản phẩm với dữ liệu FormData
    updateProduct(id, formData)
      .then(({ data }) => {
        navigate("/admin/products");
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    document.title = "Update Product";
    getCategories()
      .then(({ data }) => {
        setCategories(data.data);
        // Set category_id mặc định là _id của danh mục đầu tiên
        if (data.data.length > 0) {
          setInputs((prevInputs) => ({
            ...prevInputs,
            category_id: data.data[0]._id, // Set giá trị mặc định cho category_id
          }));
        }
      })
      .catch((error) => console.log(error));
    productDetail(id)
      .then(({ data }) => {
        setProduct(data.data);
        setInputs(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

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
              <a href="#">Quản lý sản phẩm</a>
            </li>
            <li className="active">{product.name}</li>
          </ol>
        </div>
        {/*/.row*/}
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">Sản phẩm: {product.name}</h1>
          </div>
        </div>
        {/*/.row*/}
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <form
                onSubmit={handleSubmit}
                method="post"
                encType="multipart/form-data"
              >
                <div className="panel-body">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tên sản phẩm</label>
                      <input
                        onChange={changeInput}
                        value={inputs.name || ""}
                        type="text"
                        name="name"
                        required
                        className="form-control"
                        defaultValue={product.name}
                      />
                    </div>
                    <div className="form-group">
                      <label>Giá sản phẩm</label>
                      <input
                        onChange={changeInput}
                        value={inputs.price || ""}
                        type="number"
                        name="price"
                        required
                        defaultValue={product.price}
                        className="form-control"
                      />
                    </div>
                    {/* <div className="form-group">
                                            <label>Bảo hành</label>
                                            <input type="text" name="prd_warranty" required defaultValue="12 tháng" className="form-control" />
                                        </div> */}
                    <div className="form-group">
                      <label>Phụ kiện</label>
                      <input
                        onChange={changeInput}
                        value={inputs.accessories || ""}
                        type="text"
                        name="accessories"
                        required
                        defaultValue={product.accessories}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Khuyến mãi</label>
                      <input
                        onChange={changeInput}
                        value={inputs.promotion || ""}
                        type="text"
                        name="promotion"
                        required
                        defaultValue={product.promotion}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Tình trạng</label>
                      <input
                        onChange={changeInput}
                        value={inputs.status || ""}
                        type="text"
                        name="status"
                        required
                        defaultValue={product.status}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Ảnh sản phẩm</label>
                      <input
                        name="file"
                        onChange={handleImageChange}
                        type="file"
                        className="form-control"
                      />
                      <br />
                      {/* Hiển thị ảnh đã chọn */}
                      <div>
                        {!image ? (
                          <img src={getImageProduct(product?.image)} />
                        ) : (
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Product thumbnail"
                            className="mt-3"
                          />
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Danh mục</label>
                      <select
                        name="category_id"
                        value={inputs.category_id || ""}
                        className="form-control"
                        onChange={changeInput}
                      >
                        {categories.map((category, index) => (
                          <option key={index} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Trạng thái</label>
                      <select
                        name="is_stock"
                        className="form-control"
                        onChange={changeInput}
                        value={inputs.is_stock}
                      >
                        <option value={true}>Còn hàng</option>
                        <option value={false}>Hết hàng</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Sản phẩm nổi bật</label>
                      <div className="checkbox">
                        <label>
                          <input
                            name="is_featured"
                            type="checkbox"
                            checked={inputs.is_featured}
                            onChange={(e) =>
                              setInputs({
                                ...inputs,
                                is_featured: e.target.checked,
                              })
                            }
                          />
                          Nổi bật
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Mô tả sản phẩm</label>
                      <textarea
                        id="detail"
                        required
                        name="details"
                        value={inputs.details}
                        onChange={changeInput}
                        className="form-control"
                        rows="3"
                      ></textarea>
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
                  </div>
                </div>
              </form>
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
export default ProductUpdate;
