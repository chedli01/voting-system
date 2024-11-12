import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalLayout from "./shared/components/app-layout/GlobalLayout";
import HomePage from "./pages/home/HomePage"
import "./app.css"
import RegisterPage from "./pages/register/RegisterPage"
import Error404Page from "./pages/error/Error404Page"
function App() {

  return (
    <>
    {/* <Router>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="register" element={<RegisterPage/> }/>
          <Route path="*" element={<Error404Page />} />
        </Route>
      </Routes>
    </Router> */}
    <h1>Bras lemmima ekhdem</h1>
    </>
  )
}

export default App
