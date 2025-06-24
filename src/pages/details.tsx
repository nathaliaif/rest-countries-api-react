import { useEffect, useState } from "react";
import { getData } from "../util/api.js";
import { MoveLeft } from "lucide-react";
import "../styles/details.css";
import { useLocation, useNavigate } from "react-router-dom";
import type { Country } from "../types/country.js";

export default function Details() {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const country = location.state;

  // Fetch all countries
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setAllCountries(data);
    };

    fetchData();
  }, []);

  //Get all neighboring countries
  useEffect(() => {
    if (!country || allCountries.length === 0) return;

    //Filter all neighboring countries
    const arrBorderCountries = allCountries.filter((value) =>
      country.borders?.includes(value.alpha3Code)
    );
    setBorderCountries(arrBorderCountries);
  }, [allCountries, country]);

  if (!country) {
    return <p>Country data not found.</p>; // fallback for direct access
  }

  function getInfo(key: "currencies" | "languages"): string {
    const info = country[key];

    if (info) {
      return info.map((item: Country) => item.name).join(", ");
    } else {
      return "";
    }
  }

  return (
    <div className="main-container">
      <button className="back-button" onClick={() => navigate("/")}>
        <MoveLeft />
        Back
      </button>
      <div className="details-container">
        <img
          src={country.flags.svg}
          alt={country.name}
          className="country-flag"
        />
        <div>
          <h2>{country.name}</h2>
          <div className="info-text">
            <ul className="info-text-container">
              <li className="info__text">
                <span className="info__title">Native Name: </span>
                {country.nativeName}
              </li>
              <li className="info__text">
                <span className="info__title">Population: </span>
                {country.population.toLocaleString("en-US")}
              </li>
              <li className="info__text">
                <span className="info__title">Region: </span>
                {country.region}
              </li>
              <li className="info__text">
                <span className="info__title">Sub Region: </span>
                {country.subregion}
              </li>
              <li className="info__text">
                <span className="info__title">Capital: </span>
                {country.capital ? country.capital : "-"}
              </li>
            </ul>
            <ul className="info-text-container">
              <li className="info__text">
                <span className="info__title">Top Level Domain: </span>
                {country.topLevelDomain}
              </li>
              <li className="info__text">
                <span className="info__title">Currencies: </span>
                {getInfo("currencies")}
              </li>
              <li className="info__text">
                <span className="info__title">Languages: </span>
                {getInfo("languages")}
              </li>
            </ul>
          </div>
          <div className="info-text-container">
            <h3 className="info__title-border-countries">Border Countries:</h3>
            <ul className="border-countries-container">
              {borderCountries.length === 0
                ? "None"
                : borderCountries.map((country, index) => {
                    return (
                      <li key={index}>
                        <button
                          className="border-country-card"
                          onClick={() => {
                            navigate("/details", { state: country });
                          }}
                        >
                          {country.name}
                        </button>
                      </li>
                    );
                  })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
