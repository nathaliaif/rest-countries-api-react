import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Details from "./pages/details";
import Layout from "./Layout";
import { NavigationHistoryProvider } from "./context/NavigationHistoryContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <>
      <NavigationHistoryProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/details" element={<Details />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </NavigationHistoryProvider>
    </>
  );
}

export default App;
