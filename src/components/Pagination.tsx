import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/pagination.css";

type PaginationType = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

// Pagination
const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}: PaginationType) => {
  const pageNumbers = [];

  // Get the total amount of pages necessary
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (
    pageNumber: number,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    onPageChange(pageNumber);
  };

  // Handles from on the back and next arrows
  function handleArrowClick(id) {
    if (id === "arrow-back" && currentPage > 1) {
      onPageChange(currentPage - 1);
    } else {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        <li>
          <a
            id="arrow-back"
            onClick={(e) => handleArrowClick(e.currentTarget.id)}
          >
            <ChevronLeft />
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a
              onClick={(e) => paginate(number, e)}
              href="!#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
        <li>
          <a
            id="arrow-next"
            onClick={(e) => handleArrowClick(e.currentTarget.id)}
          >
            <ChevronRight />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
