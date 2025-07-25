import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { getProductsSearch } from "../../../services/Api";
import { deleteProduct } from "../../../services/Api";
import Pagination from "../../../shared/component/Pagination";
import {
  PAGINATION_LIMIT,
  STRING_PAGINATION,
  STRING_SEARCH,
} from "../../../shared/constant/App";
import { getImageProduct, formatPrice } from "../../../shared/untils";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState({});
  const [del, setDel] = useState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get(STRING_SEARCH);
  const page = Number(searchParams.get(STRING_PAGINATION)) || 1;

  useEffect(() => {
    document.title = "Products List";

    getProductsSearch({
      params: {
        page,
        keyword,
        limit: PAGINATION_LIMIT,
      },
    })
      .then(({ data }) => {
        setProducts(data.data);
        setPages(data.pages);
      })
      .catch((error) => console.log(error));
  }, [keyword, page,del]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
      // TODO: Gọi API xoá sản phẩm, rồi reload danh sách
      deleteProduct(id)
        .then(({data})=>{
            navigate("/admin/products");
            setDel(id);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
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
          <li className="active">Danh sách sản phẩm</li>
        </ol>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">Danh sách sản phẩm</h1>
        </div>
      </div>

      <div id="toolbar" className="btn-group">
        <Link to="/admin/products/create" className="btn btn-success">
          <i className="glyphicon glyphicon-plus" /> Thêm sản phẩm
        </Link>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <table data-toolbar="#toolbar" data-toggle="table">
                <thead>
                  <tr>
                    {/* <th>STT</th> */}
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Ảnh sản phẩm</th>
                    <th>Trạng thái</th>
                    <th>Danh mục</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      {/* <td>{index+1}</td> */}
                      <td>{product.name}</td>
                      <td>{formatPrice(product?.price)}</td>
                      <td style={{ textAlign: "center" }}>
                        <img
                          width={130}
                          height={180}
                          src={getImageProduct(product?.image)}
                        />
                      </td>
                      <td>
                        <span
                          className={`label ${
                            product.is_stock ? "label-success" : "label-danger"
                          }`}
                        >
                          {product.is_stock ? "Còn hàng" : "Hết hàng"}
                        </span>
                      </td>
                      <td>{product.category}</td>
                      <td className="form-group">
                        <Link
                          to={`/admin/products/${product._id}/update`}
                          className="btn btn-primary"
                        >
                          <i className="glyphicon glyphicon-pencil" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="btn btn-danger"
                        >
                          <i className="glyphicon glyphicon-remove" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div id="pagination">
              <Pagination
                pages={
                  pages || {
                    total: 0,
                    currentPage: 1,
                    hasNext: false,
                    hasPrev: false,
                    next: 1,
                    prev: 1,
                  }
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
