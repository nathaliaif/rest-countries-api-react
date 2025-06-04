import { Outlet } from "react-router-dom";
import "./styles/global.css";
import "./styles/variables.css";
import Header from "./components/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
