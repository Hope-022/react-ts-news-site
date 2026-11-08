import { TopBar } from "./components/layout/TopBar";
import { Header } from "./components/layout/Header";
import { CategoryNav } from "./components/layout/CategoryNav";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <div>
      <TopBar />
      <Header />
      <CategoryNav activeSlug="home" />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;