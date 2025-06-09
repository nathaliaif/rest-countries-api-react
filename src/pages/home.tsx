import { useEffect, useState } from "react";
import { getData } from "../util/api.js";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function Home() {
  const [display, setDisplay] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const country = e.currentTarget.value;
    console.log(country);
    navigate("/info", { state: country });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setDisplay(data);
      setAllCountries(data);
    };

    fetchData();
  }, []);

  function handleChange(value: string, type?: string): void {
    if (type === "select") {
      const filteredData = allCountries.filter((item) =>
        item.region.toLowerCase().includes(value)
      );
      setDisplay(filteredData);
      return;
    }

    setSelectedRegion("");

    if (value === "") {
      setDisplay(allCountries);
      return;
    }

    const filteredData = allCountries.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setDisplay(filteredData);
  }

  return (
    <div className="home-container">
      <div className="filtered-searches-container">
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
      </div>
      <div className="countries-container">
        {display.map((value, index) => (
          <div key={index} className="country-card" onClick={handleClick}>
            <img src={value.flags.png} alt={value.name} />
            <div className="card__texts">
              <h3 className="card__title">{value.name}</h3>
              <div className="card__infos">
                <p>
                  <span className="card__info-title">Population: </span>
                  {value.population}
                </p>
                <p>
                  <span className="card__info-title">Region: </span>
                  {value.region}
                </p>
                <p>
                  <span className="card__info-title">Capital: </span>
                  {value.capital}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
