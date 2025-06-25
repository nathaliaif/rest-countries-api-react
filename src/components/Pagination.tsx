import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import "../styles/pagination.css";
import { useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";

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
  const [pagesAhead, setPagesAhead] = useState(0);
  const [pagesBefore, setPagesBefore] = useState(0);
  const [totalPagesShown, setTotalPagesShown] = useState(7);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const pages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(pages);
  }, [totalItems, itemsPerPage]);

  // Get the total amount of pages necessary
  for (let i: number = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  //Define the amount of page numbers being shown in the component
  const lastPage = pageNumbers.length;
  const { width } = useWindowSize(); // Gets window width

  useEffect(() => {
    if (width < 613) {
      setTotalPagesShown(3);
      setPagesAhead(currentPage + 1);
      setPagesBefore(currentPage - 1);
    } else {
      setTotalPagesShown(7);
      setPagesAhead(currentPage + 3);
      setPagesBefore(currentPage - 3);
    }
  }, [currentPage, width]);

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
      setTotalPages(pageNumbers[pageNumbers.length - 1]);
      onPageChange(totalPages);
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
            aria-label="first page"
          >
            <ChevronsLeft />
          </button>
        </li>
        <li className="page-item">
          <button
            id="arrow-back"
            onClick={(e) => handleArrowClick(e.currentTarget.id)}
            className="pagination__arrows"
            aria-label="previous page"
          >
            <ChevronLeft />
          </button>
        </li>
        {pageNumbers
          .filter((number) => {
            if (currentPage < Math.floor(totalPagesShown / 2 + 1)) {
              // Show first pages
              return number <= totalPagesShown;
            } else if (
              currentPage >
              lastPage - Math.floor(totalPagesShown / 2 - 1)
            ) {
              // Show last pages
              return number >= lastPage - (totalPagesShown - 1);
            } else {
              // Show currentPage in the middle of the other pages
              return number >= pagesBefore && number <= pagesAhead;
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
            aria-label="next page"
          >
            <ChevronRight />
          </button>
        </li>
        <li className="page-item">
          <button
            id="arrow-end"
            onClick={(e) => handleArrowClick(e.currentTarget.id)}
            className="pagination__arrows"
            aria-label="last page"
          >
            <ChevronsRight />
          </button>
        </li>
      </ul>
      <div className="pagination__caption">
        Showing {currentPage} of {totalPages != 0 ? totalPages : 1} pages
      </div>
    </nav>
  );
};

export default Pagination;
