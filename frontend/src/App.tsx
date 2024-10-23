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
import Loading from "./components/Loading";

import colchoes from "./assets/bannercolchao.jpg";
import beliches from "./assets/bannerbeliche.jpg";
import { HelmetProvider } from "react-helmet-async";

interface AppWrapperProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppWrapper = ({ loading, setLoading }: AppWrapperProps) => {
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1300);

    return () => clearTimeout(timeoutId);
  }, [location, setLoading]);

  return (
    <div className={`relative ${loading ? "blur-lg" : ""}`}>
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
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

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
          <AppWrapper loading={loading} setLoading={setLoading} />
          {!loading && <WhatsApp />} {!loading && <Footer />}
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-none z-50">
              <Loading />
            </div>
          )}
        </BrowserRouter>
      </main>
    </HelmetProvider>
  );
}
