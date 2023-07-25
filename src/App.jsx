import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Catalogo from "./pages/Catalogo";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./components/Rootlayout";
import { ShoppingCartProvider } from "./context/CartContext";
import Payment from "./pages/Payment";
import SuccessPay from "./pages/SuccessPay";

function App() {
  return (
    <ShoppingCartProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<RootLayout />}>
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/succes" element={<SuccessPay />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ShoppingCartProvider>
  );
}

export default App;
