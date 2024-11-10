import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalLayout from "./GlobalLayout";
import HomePage from "./HomePage";
import "./app.css"
import RegisterPage from "./RegisterPage";
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="register" element={<RegisterPage/> }/>
          <Route path="*" element={<h1>Error</h1>} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
