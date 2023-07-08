import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/HomePage";
import SigninPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import { useCookies } from "react-cookie";
import Navbar from "./components/Navbar";

function App() {
  const [message, setMessage] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000");
        const appData = await res.json();
        setMessage(appData.message);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const removeCookieInBrowser = () => {
    console.log("removecookiefumc")
    removeCookie("Prasad");
  };

  return (
    <>
      <Navbar cookieremove={removeCookieInBrowser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SigninPage setCook={setCookie} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route></Route>
      </Routes>
      <div>{message}</div>
    </>
  );
}

export default App;
