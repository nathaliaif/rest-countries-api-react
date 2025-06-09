import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Info from "./pages/info";
import Layout from "./Layout";
import { InfoProvider } from "./context/InfoContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <>
      <InfoProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/result" element={<Info />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </InfoProvider>
    </>
  );
}

export default App;
