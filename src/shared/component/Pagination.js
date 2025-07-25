import React from "react";
import {
  ALL_STRING_QUERY,
  PAGINATION_DELTA,
  STRING_PAGINATION,
  STRING_SEARCH,
  PAGINATION_LIMIT,
} from "../constant/App";
import { useSearchParams, useLocation, Link } from "react-router-dom";
const Pagination = ({ pages }) => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const keyword = searchParams.get(STRING_SEARCH);
  const { pathname, search } = useLocation();
  const { total, currentPage, hasNext, hasPrev, next, prev } = pages;
  const totalPages = Math.ceil(total / PAGINATION_LIMIT);

  const formatUrl = (page) => {
    let URL = `${pathname}?${STRING_PAGINATION}=${page}`;
    ALL_STRING_QUERY.map((item, index) => {
      let param = searchParams.get(item);
      if (param !== null) {
        URL += `&${item}=${param}`;
      }
    });
    return URL;
  };
  // const formatUrl = (page) => {
  //     let URL = `${pathname}?${STRING_PAGINATION}=${page}`;
  //     if (keyword !== null) {
  //         url += `&${STRING_SEARCH}=${keyword}`;
  //     }
  //     return URL;
  // }

  const renderPagesHTML = (delta = 2) => {
    const listPages = [];
    const left = currentPage - delta;
    const right = currentPage + delta;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === currentPage ||
        i === totalPages ||
        (i >= left && i <= right)
      ) {
        listPages.push(i);
      }
    }
    return listPages;
  };

  return (
    <ul className="pagination">
      {hasPrev ? (
        <li className="page-item">
          <Link className="page-link" to={formatUrl(prev)}>
            Trang trước
          </Link>
        </li>
      ) : null}

      {renderPagesHTML(PAGINATION_DELTA).map(
        (page, index) => (
          <li
            key={index}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            <Link className="page-link" to={formatUrl(page)}>
              {page}
            </Link>
          </li>
        ),
        // <li key={index} className={`page-item ${page === currentPage && 'active'}`}><Link className="page-link" to={formatUrl(page)}>{page}</Link></li>
      )}

      {hasNext ? (
        <li className="page-item">
          <Link className="page-link" to={formatUrl(next)}>
            Trang sau
          </Link>
        </li>
      ) : null}
    </ul>
  );
};
export default Pagination;
