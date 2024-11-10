import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalLayout from "./GlobalLayout";
import HomePage from "./HomePage";
import "./app.css"
import RegisterPage from "./RegisterPage";
import Error404Page from "./Error404Page";
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="register" element={<RegisterPage/> }/>
          <Route path="*" element={<Error404Page />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
