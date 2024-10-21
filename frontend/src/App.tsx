import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Products from "./pages/Products";
import WhatsApp from "./components/WhatsApp";
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
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [location, setLoading]);

  if (loading) {
    return <Loading />;
  }

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
      <Route path="/todos-produtos" element={<Product />} />
      <Route path="/produto/:productId" element={<Products />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default function App() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true); // Mova o estado de loading aqui

  const handleLogin = () => {
    setUser({ name: "Renan" });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HelmetProvider>
      <main className="flex flex-col min-h-screen pb-16">
        <BrowserRouter>
          <Toaster position="top-right" expand={true} richColors />
          <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
          <AppWrapper loading={loading} setLoading={setLoading} />{" "}
          {/* Passe o estado de loading */}
          {!loading && <WhatsApp />}{" "}
          {/* Altere a lógica para usar o estado de loading */}
          {!loading && <Footer />}{" "}
          {/* Altere a lógica para usar o estado de loading */}
        </BrowserRouter>
      </main>
    </HelmetProvider>
  );
}
