import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/register" element={<h1>Register</h1>} />
        <Route path="*" element={<h1>Error</h1>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
