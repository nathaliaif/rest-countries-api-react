import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
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
  const pageNumbers: number[] = [];

  // Get the total amount of pages necessary
  for (let i: number = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const lastPage = pageNumbers.length;
  const threeAhead = currentPage + 3;
  const threeBefore = currentPage - 3;

  const paginate = (
    pageNumber: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    onPageChange(pageNumber);
  };

  // Handles from on the back and next arrows
  function handleArrowClick(id: string) {
    // Logic for arrow back
    if (id === "arrow-back" && currentPage > 1) {
      onPageChange(currentPage - 1);
    } else if (id === "arrow-back" && currentPage === 1) {
      return;
    }

    // Logic for arrow next
    if (id === "arrow-next" && currentPage != pageNumbers.length) {
      onPageChange(currentPage + 1);
    } else if (id === "arrow-next") {
      onPageChange(1);
    }

    // Logic for arrow start
    if (id === "arrow-start") {
      onPageChange(1);
    }

    // Logic for arrow end
    if (id === "arrow-end") {
      onPageChange(pageNumbers[pageNumbers.length - 1]);
    }
  }

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        <li className="page-item">
          <button
            id="arrow-start"
            onClick={(e) => handleArrowClick(e.currentTarget.id)}
            className="pagination__arrows"
          >
            <ChevronsLeft />
          </button>
        </li>
        <li className="page-item">
          <button
            id="arrow-back"
            onClick={(e) => handleArrowClick(e.currentTarget.id)}
            className="pagination__arrows"
          >
            <ChevronLeft />
          </button>
        </li>
        {pageNumbers
          .filter((number) => {
            if (currentPage < 4) {
              // Show first 7
              return number <= 7;
            } else if (currentPage > lastPage - 3) {
              // Show last 7
              return number >= lastPage - 6;
            } else {
              // Show currentPage centered with 3 before and 3 after
              return number >= threeBefore && number <= threeAhead;
            }
          })
          .map((number) => (
            <li key={number} className="page-item">
              <button
                className={`page-link ${
                  currentPage === number ? "active" : ""
                }`}
                onClick={(e) => paginate(number, e)}
              >
                {number}
              </button>
            </li>
          ))}
        <li className="page-item">
          <button
            id="arrow-next"
            onClick={(e) => handleArrowClick(e.currentTarget.id)}
            className="pagination__arrows"
          >
            <ChevronRight />
          </button>
        </li>
        <li className="page-item">
          <button
            id="arrow-end"
            onClick={(e) => handleArrowClick(e.currentTarget.id)}
            className="pagination__arrows"
          >
            <ChevronsRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
