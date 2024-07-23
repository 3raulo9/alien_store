import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductScreen from "./screens/ProductScreen";
import Login from "./screens/Login";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminScreen from "./screens/AdminScreen";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart/" element={<CartScreen />} />
              <Route path="/profile/" element={<ProfileScreen />} />
              <Route path="/profile/:id" element={<ProfileScreen />} />
              <Route path="/adminActions" element={<AdminScreen />} /> {/* Fix Route here */}
              {/* Additional routes as needed */}
            </Routes>
          </Container>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
