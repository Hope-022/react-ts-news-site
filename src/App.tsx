import { Header } from "./components/layout/Header";
import { CategoryNav } from "./components/layout/CategoryNav";
import { TopBar } from "./components/layout/TopBar";

function App() {
    return(
        <div>
             <TopBar />
            <Header />
            <CategoryNav activeSlug="home"/>
        </div>
    );
}

export default App;