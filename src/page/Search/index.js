import { useState, useEffect } from "react";
import { getProductsSearch } from "../../services/Api";
import { useSearchParams } from "react-router-dom";
import ProductItem from "../../shared/component/product-item";
import Pagination from "../../shared/component/Pagination";
import {
  PAGINATION_LIMIT,
  STRING_PAGINATION,
  STRING_SEARCH,
} from "../../shared/constant/App";

function Search() {
  const [products, setProducts] = useState([]);
  const [SearchParams, setSearchParams] = useSearchParams();
  const keyword = SearchParams.get(STRING_SEARCH);
  //pagination
  const page = Number(SearchParams.get(STRING_PAGINATION)) || 1;
  const [pages, setPages] = useState({});

  useEffect(() => {
    document.title = "Search";

    //Get Products
    getProductsSearch({
      params: {
        page: page,
        keyword,
        limit: PAGINATION_LIMIT,
      },
    })
      .then(({ data }) => {
        //Set Products
        setProducts(data.data);
        //Set Pages
        setPages(data.pages);
      })
      .catch((error) => console.log(error));
  }, [keyword, page]);

  return (
    <>
      <div>
        <div className="products">
          <div id="search-result">
            Kết quả tìm kiếm với sản phẩm <span>{keyword}</span>
          </div>
          <div className="product-list card-deck">
            {products.map((product, index) => (
              <ProductItem key={index} item={product} />
            ))}
          </div>
        </div>
        {/*	End List Product	*/}
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
    </>
  );
}
export default Search;
