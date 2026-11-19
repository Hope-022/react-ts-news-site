import { Routes, Route, useLocation } from "react-router";
import { TopBar } from "./components/layout/TopBar";
import { Header } from "./components/layout/Header";
import { CategoryNav } from "./components/layout/CategoryNav";
import { Footer } from "./components/layout/Footer";
import { BottomNav } from "./components/layout/BottomNav";
import { GlobalRadioPlayer } from "./components/radio/GlobalRadioPlayer";
import { useRadio } from "./context/radioContext";
import { HomePage } from "./pages/HomePage";
import { ArticlePage } from "./pages/ArticlePage";
import { CategoryPage } from "./pages/CategoryPage";
import { SearchPage } from "./pages/SearchPage";
import { RadioPage } from "./pages/RadioPage";
import { SavedPage } from "./pages/SavedPage";

function getActiveSlug(pathname: string): string | undefined {
  if (pathname === "/") return "home";
  if (pathname === "/radio") return "radio";
  if (pathname.startsWith("/category/")) return pathname.split("/")[2];
  return undefined;
}

function App() {
  const { pathname } = useLocation();
  const { current } = useRadio();

  return (
    <div className={current ? "pb-52 md:pb-24" : "pb-14 md:pb-0"}>
      <TopBar />
      <Header />
      <CategoryNav activeSlug={getActiveSlug(pathname)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/radio" element={<RadioPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="*" element={<p className="p-6">Page not found.</p>} />
      </Routes>
      <Footer />
      <GlobalRadioPlayer />
      <BottomNav />
    </div>
  );
}

export default App;