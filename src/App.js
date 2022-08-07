import React from "react";
import { BrowserRouter,
            Routes,
            Route,
            useParams} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Clients from "./components/Clients";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import 'bootstrap/dist/css/bootstrap.min.css';

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
                    <Route exact path="/client/:cid" element={<Clients />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;