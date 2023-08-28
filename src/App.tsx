import React from "react";
import "./App.css";
import HomeScreen from "./app/ePaperScreen";
import { Route, Routes } from "react-router-dom";
import CarousalEpaper from "./app/ePaperScreen/component/carousal";
import PrintEpaper from "./app/ePaperScreen/component/newWindow";

function App() {
  return (
    <Routes>
      <Route index element={<HomeScreen />} />
      <Route path="/" element={<HomeScreen />} />
      <Route path="/e-paper" element={<CarousalEpaper />} />
      <Route path="/print-e-paper" element={<PrintEpaper />} />
    </Routes>
  );
}

export default App;
