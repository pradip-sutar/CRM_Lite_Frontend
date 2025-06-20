import React, { useEffect, useState } from "react";

const NumberedPagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  useEffect(() => {
    handleClick(1);
  }, [totalPages]);

  const getPageNumbers = () => {
    const pages = [];
    const visibleStart = Math.max(2, currentPage - 2);
    const visibleEnd = Math.min(totalPages - 1, currentPage + 2);

    pages.push(1);

    if (visibleStart > 2) {
      pages.push("start-ellipsis");
    }

    for (let i = visibleStart; i <= visibleEnd; i++) {
      pages.push(i);
    }

    if (visibleEnd < totalPages - 1) {
      pages.push("end-ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {/* Previous Button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => handleClick(currentPage - 1)}
            aria-label="Go to previous page"
          >
            &laquo;
          </button>
        </li>

        {pages.map((page, index) =>
          typeof page === "number" ? (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handleClick(page)}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          ) : (
            <li key={page + index} className="page-item disabled">
              <span className="page-link text-muted">…</span>
            </li>
          )
        )}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => handleClick(currentPage + 1)}
            aria-label="Go to next page"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};
 
export default NumberedPagination;
 