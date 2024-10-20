import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Product from "./pages/Product";
import WhatsApp from "./components/WhatsApp";
import Category from "./pages/Category";

import colchoes from "./assets/bannercolchao.jpg";
import beliches from "./assets/bannerbeliche.jpg";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <main className="text-tertiary">
      <BrowserRouter>
        <Toaster position="top-right" expand={true} richColors />
        <Header />
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

          {/* Não encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsApp />
        <Footer />
      </BrowserRouter>
    </main>
  );
}
