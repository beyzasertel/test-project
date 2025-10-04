import Login from "./components/Login";
import "./components/Layout.css";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css"; // Reactstrap
import "./index.css";

function App() {
  return (
    <>
      <div className="content-section">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
