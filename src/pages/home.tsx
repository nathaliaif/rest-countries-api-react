import { useEffect, useState } from "react";
import { getData } from "../util/api";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import Pagination from "../components/Pagination.js";
import type { Country } from "../types/country";
import LoadingCard from "../components/LoadingCard.js";
import { useNavigationHistory } from "../context/NavigationHistoryContext.js";

export default function Home() {
  const [display, setDisplay] = useState<Country[]>([]);
  const [totalCountries, setTotalCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { navigationHistory, setNavigationHistory } = useNavigationHistory();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage: number = 8;

  // Navigate
  const navigate = useNavigate();

  const handleClick = (country: Country) => {
    navigate("/details", { state: country });
  };

  // Fetch all countries from api
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getData();
      setTotalCountries(data);

      if (navigationHistory.filter.length === 0) {
        setNavigationHistory((prev) => ({ ...prev, filter: data }));
        handlePageChange(navigationHistory.currentPage, data);
      } else {
        // If user used any kind of filters, returns where it was before clicking in a country
        handlePageChange(
          navigationHistory.currentPage,
          navigationHistory.filter
        );
        setSelectedRegion(navigationHistory.select);
        setInputSearch(navigationHistory.input);
      }

      // Loading animation
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  // Send page back to top when changes occur
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [display]);

  // Input and select filtering logic
  function handleChange(value: string, type?: string): void {
    if (type === "select") {
      // Logic for select filter
      navigationHistory.filter = totalCountries.filter((item) =>
        item.region.toLowerCase().includes(value)
      );
      setSelectedRegion(value);
      setInputSearch("");

      // Adds the selected Region to NavigationHistoryContext
      setNavigationHistory((prev) => ({
        ...prev,
        input: "",
        select: value,
      }));
    } else {
      // Logic for input filter
      setSelectedRegion("");
      setInputSearch(value);
      navigationHistory.filter =
        value === ""
          ? totalCountries
          : totalCountries.filter((item) =>
              item.name.toLowerCase().includes(value.toLowerCase())
            );

      // Adds the text being typed in the input to NavigationHistoryContext
      setNavigationHistory((prev) => ({
        ...prev,
        input: value,
        select: "",
      }));
    }

    handlePageChange(1, navigationHistory.filter); // reset to page 1 and paginate new filtered data
  }

  // Pagination
  function handlePageChange(
    pageNumber: number,
    data = navigationHistory.filter
  ) {
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSlice = data.slice(indexOfFirstItem, indexOfLastItem);

    setDisplay(currentSlice);
    setCurrentPage(pageNumber);

    setNavigationHistory((prev) => ({
      ...prev,
      filter: data,
      currentPage: pageNumber,
    }));
  }

  return (
    <div className="home-container">
      <nav className="filtered-searches-container">
        <div className="input-search-container">
          <Search className="search-icon" />
          <input
            type="text"
            className="input-search"
            placeholder="Search for a country..."
            onChange={(e) => handleChange(e.target.value)}
            value={inputSearch}
          />
          {inputSearch && (
            <button
              type="button"
              className="clear-btn"
              aria-label="Clear input filter"
              onClick={() => handleChange("")}
            >
              <X />
            </button>
          )}
        </div>
        <div className="select-container">
          <select
            id="region-select"
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              handleChange(e.target.value, "select");
            }}
            aria-label="Filter by Region"
          >
            <option value="">Filter by Region</option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
          {selectedRegion && (
            <button
              type="button"
              className="clear-btn clear-select-btn"
              aria-label="Clear region filter"
              onClick={() => {
                setSelectedRegion("");
                handleChange("", "select");
              }}
            >
              <X />
            </button>
          )}
        </div>
      </nav>
      <div className="countries-container">
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, i) => (
              <LoadingCard key={i} />
            ))
          : display.map((value: Country, index) => (
              <button
                key={index}
                className="country-card"
                onClick={() => handleClick(value)}
                aria-label={`View details about ${value.name}`}
              >
                <img src={value.flags.png} alt={value.name} />
                <div className="card__texts">
                  <h2 className="card__title">{value.name}</h2>
                  <ul className="card__infos">
                    <li>
                      <span className="card__info-title">Population: </span>
                      {value.population.toLocaleString("en-US")}
                    </li>
                    <li>
                      <span className="card__info-title">Region: </span>
                      {value.region}
                    </li>
                    <li>
                      <span className="card__info-title">Capital: </span>
                      {value.capital ?? "-"}
                    </li>
                  </ul>
                </div>
              </button>
            ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={navigationHistory.filter.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
