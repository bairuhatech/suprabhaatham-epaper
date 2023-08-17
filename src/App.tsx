import React from "react";
import "./App.css";
import HomeScreen from "./app/ePaperScreen";
import { Route, Routes } from "react-router-dom";
import CarousalEpaper from "./app/ePaperScreen/component/carousal";

function App() {
  return (
    <Routes>
      <Route index element={<HomeScreen />} />
      <Route path="/" element={<HomeScreen />} />
      <Route path="/e-paper" element={<CarousalEpaper />} />
    </Routes>
  );
}

export default App;
