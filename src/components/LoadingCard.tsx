import "../styles/loadingCard.css";

export default function LoadingCard() {
  return (
    <div className="loading-card">
      <div className="loading__image"></div>
      <div className="loading__content">
        <h2 className="loading__title"></h2>
        <p className="loading__text"></p>
      </div>
    </div>
  );
}
