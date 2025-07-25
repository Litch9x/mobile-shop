import { useEffect, useState } from "react";
import { categoriesList, deleteCategory } from "../../../services/Api";
import Pagination from "../../../shared/component/Pagination";
import {
  PAGINATION_LIMIT,
  STRING_PAGINATION,
  STRING_SEARCH,
} from "../../../shared/constant/App";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [pages, setPages] = useState([]);
  const [del, setDel] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get(STRING_PAGINATION)) || 1;
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá user này?")) {
      // TODO: Gọi API xoá sản phẩm, rồi reload danh sách
      deleteCategory(id)
        .then(({ data }) => {
          navigate("/admin/categories");
          setDel(data.data.category?._id);
        })
        .catch((error) => console.log(error));
    }
  };
  useEffect(() => {
    document.title = "Categories List";
    categoriesList({
      params: {
        page,
        limit: PAGINATION_LIMIT,
      },
    })
      .then(({ data }) => {
        setCategories(data.data);
        setPages(data.pages);
      })
      .catch((error) => console.log(error));
  }, [page, del]);
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
            <li className="active">Quản lý danh mục</li>
          </ol>
        </div>
        {/*/.row*/}
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">Quản lý danh mục</h1>
          </div>
        </div>
        {/*/.row*/}
        <div id="toolbar" className="btn-group">
          <a href="/admin/categories/create" className="btn btn-success">
            <i className="glyphicon glyphicon-plus" /> Thêm danh mục
          </a>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-body">
                <table data-toolbar="#toolbar" data-toggle="table">
                  <thead>
                    <tr>
                      <th>Tên danh mục</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((item, index) => (
                      <tr key={index}>
                        {/*<td style={{}}>1</td>*/}
                        <td style={{}}>{item?.name}</td>
                        <td className="form-group">
                          <a
                            href={`/admin/categories/${item?._id}/update`}
                            className="btn btn-primary"
                          >
                            <i className="glyphicon glyphicon-pencil" />
                          </a>
                          <button
                            type="button"
                            onClick={() => handleDelete(item?._id)}
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
              <div className="panel-footer">
                <nav aria-label="Page navigation example">
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
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/*/.row*/}
      </div>{" "}
      {/*/.main*/}
    </>
  );
}
export default CategoriesList;
