import "./App.css";
import Login from "./components/Login";
import "./components/Layout.css";
import { Routes, Route } from "react-router-dom";

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
