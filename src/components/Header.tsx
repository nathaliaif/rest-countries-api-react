import "../styles/header.css";
import { Moon } from "lucide-react";
import { useDarkTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { isDarkTheme, setIsDarkTheme } = useDarkTheme();

  const handleClick = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const navigate = useNavigate();

  return (
    <>
      <nav>
        <h1 className="nav-title" onClick={() => navigate("/")}>
          <span>Where</span> in the world?
        </h1>
        <button className="toggle-container" onClick={handleClick}>
          <Moon className="moon-icon" />
          <span className="toggle__text">
            {isDarkTheme ? "Light" : "Dark"} Mode
          </span>
        </button>
      </nav>
    </>
  );
}
