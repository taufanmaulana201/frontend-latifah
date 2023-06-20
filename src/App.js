import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Pengeluaran from "./pages/Pengeluaran";
import AddPengeluaran from "./pages/AddPengeluaran";
import EditPengeluaran from "./pages/EditPengeluaran";
import Barang from "./pages/Barang";
import AddBarang from "./pages/AddBarang";
import EditBarang from "./pages/EditBarang";
import Suplier from "./pages/Suplier";
import AddSuplier from "./pages/AddSuplier";
import EditSuplier from "./pages/EditSuplier";
import Penjualan from "./pages/Penjualan";
import Laporan from "./pages/Laporan";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/pengeluaran" element={<Pengeluaran />} />
          <Route path="/pengeluaran/add" element={<AddPengeluaran />} />
          <Route path="/pengeluaran/edit/:id" element={<EditPengeluaran />} />
          <Route path="/barang" element={<Barang />} />
          <Route path="/barang/add" element={<AddBarang />} />
          <Route path="/barang/edit/:id" element={<EditBarang />} />
          <Route path="/suplier" element={<Suplier />} />
          <Route path="/suplier/add" element={<AddSuplier />} />
          <Route path="/suplier/edit/:id" element={<EditSuplier />} />
          <Route path="/penjualan" element={<Penjualan />} />
          <Route path="/laporan" element={<Laporan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
