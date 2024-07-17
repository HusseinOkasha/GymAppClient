import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import OwnerAccountManagerPage from "./pages/OwnerAccountManagerPage";

import CreateNewAccountPage from "./pages/CreateNewAccountPage";
import LoginPage from "./pages/LoginPage";
import GetAllOwnersPage from "./pages/AllOwnersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="owner-account-manager">
          <Route index element={<OwnerAccountManagerPage />} />
          <Route path="owners" element={<GetAllOwnersPage />} />
          <Route
            path="create-owner-account"
            element={<CreateNewAccountPage />}
          />
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>

        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
