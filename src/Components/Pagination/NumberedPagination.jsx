import React, { useState } from "react";

const NumberedPagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

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
    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", padding: "10px 0" }}>
      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={page}
            onClick={() => handleClick(page)}
            style={{
              minWidth: "36px",
              height: "36px",
              padding: "0 10px",
              fontSize: "14px",
              backgroundColor: currentPage === page ? "#333" : "#fff",
              color: currentPage === page ? "#FFF" : "#333",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.2s, color 0.2s",
            }}
          >
            {page}
          </button>
        ) : (
          <span
            key={page + index}
            style={{
              minWidth: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              color: "#999",
            }}
          >
            ...
          </span>
        )
      )}
    </div>
  );
};

export default NumberedPagination;
