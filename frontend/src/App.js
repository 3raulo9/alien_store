import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import LoaderMain from "./components/LoaderMain";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductScreen from "./screens/ProductScreen";
import Login from "./screens/Login";
import { Routes, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Sidebar />
      <LoaderMain loading={loading} />
      <div className="main-content">
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact />
              <Route path="/login" element={<Login setLoading={setLoading} />} />
              <Route path="/register" element={<RegisterScreen setLoading={setLoading} />} />
              <Route path="/product/:id" element={<ProductScreen setLoading={setLoading} />} />
              <Route path="/cart/" element={<CartScreen setLoading={setLoading} />} />
              <Route path="/profile/" element={<ProfileScreen setLoading={setLoading} />} />
            </Routes>
          </Container>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
