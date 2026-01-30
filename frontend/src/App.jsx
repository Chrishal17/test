import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import SolveProblem from "./pages/SolveProblem"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solve/:problemId" element={<SolveProblem />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
