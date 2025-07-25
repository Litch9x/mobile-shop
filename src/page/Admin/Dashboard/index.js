import { useEffect, useState } from "react";
import { dashboard } from "../../../services/Api";

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  useEffect(() => {
    document.title = "DASHBOARD";
    dashboard()
      .then(({ data }) => {
        console.log(data);
        setTotalProducts(data.data.totalProducts);
        setTotalCustomer(data.data.totalCustomers);
        setTotalComments(data.data.totalComments);
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
            <li className="active">Trang chủ quản trị</li>
          </ol>
        </div>
        {/*/.row*/}
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">Trang chủ quản trị</h1>
          </div>
        </div>
        {/*/.row*/}
        <div className="row">
          <div className="col-xs-12 col-md-6 col-lg-3">
            <div className="panel panel-blue panel-widget">
              <div className="row no-padding">
                <div className="col-sm-3 col-lg-5 widget-left">
                  <svg className="glyph stroked bag">
                    <use xlinkHref="#stroked-bag" />
                  </svg>
                </div>
                <div className="col-sm-9 col-lg-7 widget-right">
                  <div className="large">{totalProducts}</div>
                  <div className="text-muted">Sản Phẩm</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-3">
            <div className="panel panel-orange panel-widget">
              <div className="row no-padding">
                <div className="col-sm-3 col-lg-5 widget-left">
                  <svg className="glyph stroked empty-message">
                    <use xlinkHref="#stroked-empty-message" />
                  </svg>
                </div>
                <div className="col-sm-9 col-lg-7 widget-right">
                  <div className="large">{totalComments}</div>
                  <div className="text-muted">Bình Luận</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-3">
            <div className="panel panel-teal panel-widget">
              <div className="row no-padding">
                <div className="col-sm-3 col-lg-5 widget-left">
                  <svg className="glyph stroked male-user">
                    <use xlinkHref="#stroked-male-user" />
                  </svg>
                </div>
                <div className="col-sm-9 col-lg-7 widget-right">
                  <div className="large">{totalCustomer}</div>
                  <div className="text-muted">Thành Viên</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-3">
            <div className="panel panel-red panel-widget">
              <div className="row no-padding">
                <div className="col-sm-3 col-lg-5 widget-left">
                  <svg className="glyph stroked app-window-with-content">
                    <use xlinkHref="#stroked-app-window-with-content" />
                  </svg>
                </div>
                <div className="col-sm-9 col-lg-7 widget-right">
                  <div className="large">25.2k</div>
                  <div className="text-muted">Quảng Cáo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
