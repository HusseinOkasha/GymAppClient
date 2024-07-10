import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import OwnerAccountManagerPage from "./pages/OwnerAccountManagerPage";

import CreateNewAccountPage from "./pages/CreateNewAccountPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/owner-account-manager/create-owner-account"
          element={<CreateNewAccountPage />}
        ></Route>
        <Route
          path="/owner-account-manager"
          element={<OwnerAccountManagerPage />}
        />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
