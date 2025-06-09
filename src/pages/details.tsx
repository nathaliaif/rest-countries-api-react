import { useEffect, useState } from "react";
import { getData } from "../util/api.js";
import { MoveLeft } from "lucide-react";
import "../styles/details.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Details() {
  const [allCountries, setAllCountries] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setAllCountries(data);
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const country = location.state;

  if (!country) {
    return <p>Country data not found.</p>; // fallback for direct access
  }

  function getBorderCountries() {
    const borderCountries = country.borders;
  }

  function getInfo(key: "currencies" | "languages"): string {
    const info = country[key];
    return info.map((item) => item.name).join(", ");
  }

  getBorderCountries();

  return (
    <div className="main-container">
      <button className="back-button" onClick={() => navigate("/")}>
        <MoveLeft />
        Back
      </button>
      <div className="details-container">
        <img src={country.flags.png} alt={country.name} />
        <div>
          <h2>{country.name}</h2>
          <div className="info-text-container">
            <p className="info__text">
              <span className="info__title">Native Name: </span>
              {country.nativeName}
            </p>
            <p className="info__text">
              <span className="info__title">Population: </span>
              {country.population}
            </p>
            <p className="info__text">
              <span className="info__title">Region: </span>
              {country.region}
            </p>
            <p className="info__text">
              <span className="info__title">Sub Region: </span>
              {country.subregion}
            </p>
            <p className="info__text">
              <span className="info__title">Capital: </span>
              {country.capital}
            </p>
          </div>
          <div className="info-text-container">
            <p className="info__text">
              <span className="info__title">Top Level Domain: </span>
              {country.topLevelDomain}
            </p>
            <p className="info__text">
              <span className="info__title">Currencies: </span>
              {getInfo("currencies")}
            </p>
            <p className="info__text">
              <span className="info__title">Languages: </span>
              {getInfo("languages")}
            </p>
          </div>
          <div className="info-text-container">
            <h3 className="info__title-border-countries">Border Countries:</h3>
            <div className="border-countries-container">{}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
