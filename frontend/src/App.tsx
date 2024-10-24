import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AllProduct from "./pages/AllProduct";
import Product from "./pages/Product";
import WhatsApp from "./components/users/WhatsApp";
import Category from "./pages/Category";
import NotFound from "./components/NotFound";

import colchoes from "./assets/bannercolchao.jpg";
import beliches from "./assets/bannerbeliche.jpg";
import { HelmetProvider } from "react-helmet-async";

const AppWrapper = () => {
  const location = useLocation();

  // Efeito para rolar para o topo quando a página muda
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/colchoes"
        element={<Category banner={colchoes} category={"Colchões"} />}
      />
      <Route
        path="/beliches"
        element={<Category banner={beliches} category={"Beliches"} />}
      />
      <Route path="/todos-produtos" element={<AllProduct />} />
      <Route path="/produto/:productId" element={<Product />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default function App() {
  const [user, setUser] = useState<{ name: string } | null>(null);

  const handleLogin = () => {
    setUser({ name: "Renan" });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HelmetProvider>
      <main className="relative">
        <ReactNotifications />
        <BrowserRouter>
          <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
          <AppWrapper />
          <WhatsApp />
          <Footer />
        </BrowserRouter>
      </main>
    </HelmetProvider>
  );
}
