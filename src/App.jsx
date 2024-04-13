import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PrivateRoutes from "./components/Authentication/PrivateRoutes";
import Login from "./components/Authentication/Login";
import AddTemplateMain from "./components/Pages/AddTemplatesPage/AddTemplateMain";
import EditTemplateMain from "./components/Pages/EditTemplatePage/EditTemplateMain";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit-template/:id" element={<EditTemplateMain />} />
          <Route path="/add-templates" element={<AddTemplateMain />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
