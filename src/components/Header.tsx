import "../styles/header.css";
import { Moon } from "lucide-react";
import { useDarkTheme } from "../context/ThemeContext";

export default function Header() {
  const { isDarkTheme, setIsDarkTheme } = useDarkTheme();

  const handleClick = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <>
      <nav>
        <div className="nav-title">
          <span>Where</span> in the world?
        </div>
        <button className="toggle-container" onClick={handleClick}>
          <Moon className="moon-icon" />
          <span className="toggle__text">Dark Mode</span>
        </button>
      </nav>
    </>
  );
}
