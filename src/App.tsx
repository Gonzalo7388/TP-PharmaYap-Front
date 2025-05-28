// src/App.tsx
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/Index";

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <BrowserRouter>
            {/* Ya no pasas menuOpen ni setMenuOpen al Header */}
            <Header />
            <AppRoutes />
            <Footer />
        </BrowserRouter>
    );
};

export default App;
