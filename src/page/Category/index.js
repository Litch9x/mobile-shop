import { useEffect, useState } from "react";
import { getCategory, getProductsCategory } from "../../services/Api";
import ProductItem from "../../shared/component/product-item";
import { useParams, useSearchParams } from "react-router-dom";
import Pagination from "../../shared/component/Pagination";
import { PAGINATION_LIMIT, STRING_PAGINATION } from "../../shared/constant/App";

const Category = () => {
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const [SearchParams, setSearchParams] = useSearchParams();
  const page = Number(SearchParams.get(STRING_PAGINATION)) || 1;
  const [pages, setPages] = useState({});
  useEffect(() => {
    // Get Products By Category ID
    getProductsCategory(id, {
      params: {
        page: page,
        limit: PAGINATION_LIMIT,
      },
    })
      .then(({ data }) => {
        setProducts(data.data);
        setPages(data.pages);
        setTotal(data.pages?.total);
      })
      .catch((error) => console.log(error));

    //Get Category Name
    getCategory(id, {})
      .then(({ data }) => setCategory(data.category?.name))
      .catch((error) => console.log(error));
    document.title = `${category} Category Products`;
  }, [id, page, category]);
  return (
    <>
      <div className="products">
        <h3>
          {category} (hiện có {total} sản phẩm)
        </h3>
        <div className="product-list card-deck">
          {products.map((product, index) => (
            <ProductItem key={index} item={product} />
          ))}
        </div>
      </div>
      <div id="pagination">
        <Pagination pages={pages} />
      </div>
    </>
  );
};
export default Category;
