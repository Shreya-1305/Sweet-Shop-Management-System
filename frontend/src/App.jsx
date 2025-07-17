import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BuySweet from "./pages/BuySweet";
import { SweetProvider } from "./context/SweetContext";

const App = () => {
  return (
    <SweetProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<BuySweet />} />
        </Routes>
      </BrowserRouter>
    </SweetProvider>
  );
};

export default App;
