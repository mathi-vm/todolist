import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Landing from "./pages/Landing";

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Landing" element={<Landing />} />
    </Routes>
  </Router>
);

function App() {
  return <div className="App">{routes}</div>;
}

export default App;
