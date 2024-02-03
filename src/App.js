import React from "react";
import "./App.css";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="ui container">
      <Router>
        <Routes>
          <Route path="/" Component={Login}></Route>
          <Route path="/home" Component={Home}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
