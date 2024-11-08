import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalLayout from "./GlobalLayout";
import HomePage from "./HomePage";
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="register" element={<h1>Register</h1>} />
          <Route path="*" element={<h1>Error</h1>} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
