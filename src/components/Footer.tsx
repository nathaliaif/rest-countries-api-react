import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="credits">
      <a id="credits__button">
        <img src="/signature-logo-black.svg" alt="" />
      </a>
      <div className="attribution" id="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/nathaliaif">Nathalia Irokawa</a>.
      </div>
    </footer>
  );
}
