import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div id="footer-top">
        <div className="container">
          <div className="row">
            <div id="logo-2" className="col-lg-3 col-md-6 col-sm-12">
              <h2>
                <Link href="#">
                  <img src="images/logo-footer.png" />
                </Link>
              </h2>
              <p>
                Litch Mobile Shop là cửa hàng chuyên cung cấp điện thoại di
                động chính hãng và phụ kiện công nghệ uy tín, chất lượng tại
                Việt Nam. Với phương châm “Uy tín tạo nên thương hiệu”, chúng
                tôi luôn nỗ lực mang đến cho khách hàng những sản phẩm tốt nhất
                với giá cả cạnh tranh và dịch vụ hậu mãi tận tâm.
              </p>
            </div>
            <div id="address" className="col-lg-3 col-md-6 col-sm-12">
              <h3>Địa chỉ</h3>
              <p>Số 97 Chính Kinh - Thanh Xuân - Hà Nội</p>
              <p>Số 2 Tây Sơn - Đống Đa - Hà Nội</p>
            </div>
            <div id="service" className="col-lg-3 col-md-6 col-sm-12">
              <h3>Dịch vụ</h3>
              <p>Bảo hành rơi vỡ, ngấm nước Care Diamond</p>
              <p>Bảo hành Care X60 rơi vỡ ngấm nước vẫn Đổi mới</p>
            </div>
            <div id="hotline" className="col-lg-3 col-md-6 col-sm-12">
              <h3>Hotline</h3>
              <p>Phone Sale: (+84) 0345 666 888</p>
              <p>Email: test@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      {/*	Footer	*/}
      <div id="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <p>
                2018 © Vietpro Academy. All rights reserved. Developed by
                Vietpro Software.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*	End Footer	*/}
    </>
  );
}
export default Footer;
