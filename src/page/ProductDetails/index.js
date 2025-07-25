import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  getProduct,
  getCommentsProduct,
  createCommentProduct,
} from "../../services/Api";
import { getImageProduct, formatPrice } from "../../shared/untils";
import moment from "moment";
import Pagination from "../../shared/component/Pagination";
import { PAGINATION_LIMIT, STRING_PAGINATION } from "../../shared/constant/App";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { addToCart } from "../../redux-setup/reducers/cart";

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [data, setData] = useState({});
  const { id } = useParams();
  const [pages, setPages] = useState({});
  const [SearchParams, setSearchParams] = useSearchParams();
  const page = Number(SearchParams.get(STRING_PAGINATION)) || 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeInput = (e) => {
    const { name, value } = e.target;
    return setData({ ...data, [name]: value });
  };
  const getComments = (id) => {
    getCommentsProduct(id, {
      params: {
        limit: PAGINATION_LIMIT,
        page: page,
      },
    })
      .then(({ data }) => {
        //Set Comment
        setComments(data.data);
        //Set Pages
        setPages(data.pages);
      })
      .catch((error) => console.log(error));
  };
  const submitComment = () => {
    createCommentProduct(id, data)
      .then(({ data }) => {
        if (data.status === "success") {
          getComments(id);
          return setData({});
        }
      })
      .catch((error) => console.log(error));
  };

  // Add to Cart
  const clickAddToCart = (type) => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: 1,
      }),
    );
    if (type === "buy-now") {
      return navigate("/Cart");
    }
  };

  useEffect(() => {
    document.title = "Product Detail";
    //Get Product
    getProduct(id, {})
      .then(({ data }) => setProduct(data.data))
      .catch((error) => console.log(error));
    //Get Comment
    getComments(id);
  }, [id, page, comments]);
  return (
    <>
      <div>
        {/*	List Product*/}
        <div id="product">
          <div id="product-head" className="row">
            <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
              <img src={getImageProduct(product?.image)} />
            </div>
            <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
              <h1>{product?.name}</h1>
              <ul>
                <li>
                  <span>Bảo hành:</span> 12 Tháng
                </li>
                <li>
                  <span>Đi kèm:</span> {product?.accessories}
                </li>
                <li>
                  <span>Tình trạng:</span>
                  {product?.status}
                </li>
                <li>
                  <span>Khuyến Mại:</span> Dán Màn Hình 3 lớp
                </li>
                <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                <li id="price-number">{formatPrice(product?.price)}</li>
                <li
                  className={product?.is_stock ? "" : "text-danger"}
                  id="status"
                >
                  {product.is_stock ? "Còn hàng" : "Hết hàng"}
                </li>
              </ul>
              {product?.is_stock && (
                <div id="add-cart">
                  <button
                    onClick={() => {
                      clickAddToCart("buy-now");
                    }}
                    className="btn btn-warning mr-2"
                  >
                    Mua ngay
                  </button>

                  <button onClick={clickAddToCart} className="btn btn-info">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              )}
            </div>
          </div>
          <div id="product-body" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3>Đánh giá về {product?.name}</h3>
              <p>{product.details}</p>
            </div>
          </div>

          {/*Create new comment*/}
          <div id="comment" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3>Bình luận sản phẩm</h3>
              <form method="post">
                <div className="form-group">
                  <label>Tên:</label>
                  <input
                    onChange={changeInput}
                    name="name"
                    required
                    type="text"
                    className="form-control"
                    value={data.name || ""}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    onChange={changeInput}
                    name="email"
                    required
                    type="email"
                    className="form-control"
                    id="pwd"
                    value={data.email || ""}
                  />
                </div>
                <div className="form-group">
                  <label>Nội dung:</label>
                  <textarea
                    onChange={changeInput}
                    name="content"
                    required
                    rows={8}
                    className="form-control"
                    value={data.content || ""}
                  />
                </div>
                <button
                  onClick={submitComment}
                  type="button"
                  name="sbm"
                  className="btn btn-primary"
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>
          {/*	End create new Comment	*/}
          {/*	Comments List	*/}
          <div id="comments-list" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              {comments.map((comments, index) => {
                const m = moment(comments.createdAt);
                return (
                  <div key={index} className="comment-item">
                    <ul>
                      <li>
                        <b>{comments?.name}</b>
                      </li>
                      <li>{m.fromNow()}</li>
                      <li>
                        <p>{comments?.content}</p>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          {/*	End Comments List	*/}
        </div>
        {/*	End Product	*/}
        <div id="pagination">
          <Pagination pages={pages} />
        </div>
      </div>
    </>
  );
}
export default ProductDetails;
