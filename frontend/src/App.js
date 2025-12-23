import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import Home from "@/pages/Home";
import GitPush from "@/pages/GitPush";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gitpush" element={<GitPush />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;