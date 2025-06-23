import { useEffect, useState } from "react";
import { getData } from "../util/api";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Pagination from "../components/Pagination.js";
import type { Country } from "../types/country";
import LoadingCard from "../components/LoadingCard.js";

export default function Home() {
  const [display, setDisplay] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [totalCountries, setTotalCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [loading, setLoading] = useState(false);

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
      setFilteredCountries(data);
      handlePageChange(1, data);

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
    let filteredData;

    if (type === "select") {
      filteredData = totalCountries.filter((item) =>
        item.region.toLowerCase().includes(value)
      );
      setSelectedRegion(value);
    } else {
      setSelectedRegion("");
      filteredData =
        value === ""
          ? totalCountries
          : totalCountries.filter((item) =>
              item.name.toLowerCase().includes(value.toLowerCase())
            );
    }

    setFilteredCountries(filteredData);
    handlePageChange(1, filteredData); // reset to page 1 and paginate new filtered data
  }

  // Pagination
  function handlePageChange(pageNumber: number, data = filteredCountries) {
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSlice = data.slice(indexOfFirstItem, indexOfLastItem);

    setDisplay(currentSlice);
    setCurrentPage(pageNumber);
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
          />
        </div>
        <div className="select-container">
          <select
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              handleChange(e.target.value, "select");
            }}
          >
            <option value="">Filter by Region</option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
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
              >
                <img src={value.flags.png} alt={value.name} />
                <div className="card__texts">
                  <h3 className="card__title">{value.name}</h3>
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
                      {value.capital}
                    </li>
                  </ul>
                </div>
              </button>
            ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredCountries.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
