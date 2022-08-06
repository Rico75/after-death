import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Clients from "./components/Clients";
import Header from "./components/Header";
import SignIn from "./components/SignIn";

function App() {

    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/contact" element={<Contact />} />
                    <Route exact path="/clients" element={<Clients />} />
                    <Route exact path="/signIn" element={<SignIn />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;