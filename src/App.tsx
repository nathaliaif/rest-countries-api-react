import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Info from "./pages/info";
import Layout from "./Layout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Info />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
