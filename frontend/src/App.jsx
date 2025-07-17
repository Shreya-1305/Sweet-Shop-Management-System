import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BuySweet from "./pages/BuySweet";
import { SweetProvider } from "./context/SweetContext";
import SweetManagement from "./pages/SweetManagement";
import { SweetManagementProvider } from "./context/SweetManagementContext";
import { NotificationProvider } from "./context/NotificationContext";

const App = () => {
  return (
    <NotificationProvider>
      <SweetProvider>
        <SweetManagementProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<BuySweet />} />
              <Route path="/sweet-management" element={<SweetManagement />} />
            </Routes>
          </BrowserRouter>
        </SweetManagementProvider>
      </SweetProvider>
    </NotificationProvider>
  );
};

export default App;
