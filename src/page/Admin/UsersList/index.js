import { useEffect, useState } from "react";
import { usersList, deleteUser } from "../../../services/Api";
import Pagination from "../../../shared/component/Pagination";
import {
  PAGINATION_LIMIT,
  STRING_PAGINATION,
  STRING_SEARCH,
} from "../../../shared/constant/App";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState([]);
  const [del, setDel] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get(STRING_PAGINATION)) || 1;
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá user này?")) {
      // TODO: Gọi API xoá sản phẩm, rồi reload danh sách
      deleteUser(id)
        .then(({ data }) => {
          //navigate("/admin/users");
          setDel(data.data.user._id);
        })
        .catch((error) => console.log(error));
    }
  };
  useEffect(() => {
    document.title = "Users List";
    usersList({
      params: {
        page,
        limit: PAGINATION_LIMIT,
      },
    })
      .then(({ data }) => {
        setUsers(data.data);
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
            <li className="active">Danh sách thành viên</li>
          </ol>
        </div>
        {/*/.row*/}
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">Danh sách thành viên</h1>
          </div>
        </div>
        {/*/.row*/}
        <div id="toolbar" className="btn-group">
          <a href="/admin/users/create" className="btn btn-success">
            <i className="glyphicon glyphicon-plus" /> Thêm thành viên
          </a>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-body">
                <table data-toolbar="#toolbar" data-toggle="table">
                  <thead>
                    <tr>
                      <th data-field="name" data-sortable="true">
                        Họ &amp; Tên
                      </th>
                      <th data-field="price" data-sortable="true">
                        Email
                      </th>
                      <th>Quyền</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item, index) => (
                      <tr key={index}>
                        <td style={{}}>{item.fullName}</td>
                        <td style={{}}>{item.email}</td>
                        <td>
                          <span
                            className={
                              item.role == "admin"
                                ? "label label-danger"
                                : "label label-primary"
                            }
                          >
                            {item.role}
                          </span>
                        </td>
                        <td className="form-group">
                          <a
                            href={`/admin/users/${item._id}/update`}
                            className="btn btn-primary"
                          >
                            <i className="glyphicon glyphicon-pencil" />
                          </a>
                          <button
                            type="button"
                            onClick={() => handleDelete(item._id)}
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
        {/*/.row*/}
      </div>{" "}
      {/*/.main*/}
    </>
  );
}
export default UsersList;
