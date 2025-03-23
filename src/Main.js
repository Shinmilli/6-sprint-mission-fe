import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/layout/App";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Items from "./pages/items/Index.jsx";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ";
import Registration from "./pages/registration/Index.jsx";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="items" element={<Items />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="registration" element={<Registration />} />
        </Route>

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
