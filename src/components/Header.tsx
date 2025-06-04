import "../styles/header.css";
import { Moon } from "lucide-react";

export default function Header() {
  return (
    <>
      <nav>
        <div className="nav-title">
          <span>Where</span> in the world?
        </div>
        <div className="toggle-container">
          <Moon className="moon-icon" />
          <span className="toggle__text">Dark Mode</span>
        </div>
      </nav>
    </>
  );
}
