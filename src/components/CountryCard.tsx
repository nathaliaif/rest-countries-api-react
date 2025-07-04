import type { Country } from "../types/country";

export default function CountryCard({ value }: { value: Country }) {
  return (
    <div className="country-card">
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
  );
}
