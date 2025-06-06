import { useEffect, useState } from "react";
import { getData } from "../api.js";
import "../styles/home.css";

export default function Home() {
  const [filteredSearch, setFilteredSearch] = useState("");
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setAllCountries(data);
    };

    fetchData();
  }, []);

  const sixCountries = allCountries.slice(0, 5);

  return (
    <div className="home-container">
      <input
        type="text"
        className="input-search"
        placeholder="Search for a country"
      />
      <div className="countries-container">
        {sixCountries.map((value, index) => (
          <div key={index} className="country-card">
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
