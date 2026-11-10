import { Routes, Route, useLocation } from "react-router";
import { TopBar } from "./components/layout/TopBar";
import { Header } from "./components/layout/Header";
import { CategoryNav } from "./components/layout/CategoryNav";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { ArticlePage } from "./pages/ArticlePage";
import { CategoryPage } from "./pages/CategoryPage";

function getActiveSlug(pathname: string): string | undefined {
  if (pathname === "/") return "home";
  if (pathname === "/radio") return "radio";
  if (pathname.startsWith("/category/")) return pathname.split("/")[2];
  return undefined;
}

function App() {
  const { pathname } = useLocation();

  return (
    <div>
      <TopBar />
      <Header />
      <CategoryNav activeSlug={getActiveSlug(pathname)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="*" element={<p className="p-6">Page not found.</p>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;