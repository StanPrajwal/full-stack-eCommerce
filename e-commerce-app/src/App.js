import { Route, Routes } from "react-router-dom";
import Cart from "./Components/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import Products from "./Components/Product";
import { PrivateRoutes } from "./PrivateRoute";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/product" element={<Products />} />
          <Route path="/carts" element={<Cart />} />
        </Route>

      </Routes>

    </div>
  );
}

export default App;
