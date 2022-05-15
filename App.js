import { NativeRouter, Route, Routes } from "react-router-native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { AuthProvider } from "./context/AuthContext";
import TokenValidation from "./screens/TokenValidation";
import PasswordRecovery from "./screens/PasswordRecovery";
import TokenValidationTwo from "./screens/TokenValidationTwo";
import PasswordRecoveryForm from "./screens/PasswordRecoveryForm";
import UserLoged from "./screens/UserLoged";
import TokenVerificated from "./screens/TokenVerificated";
import NotConected from "./screens/NotConected";

export default function App() {
  return (
    <AuthProvider>
      <NativeRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tokenValidation" element={<TokenValidation />} />
          <Route path="/passwordRecovery" element={<PasswordRecovery />} />
          <Route path="/tokenValidationPassword" element={<TokenValidationTwo />} />
          <Route path="/passwordRecoveryForm" element={<PasswordRecoveryForm />} />
          <Route path="/userLoged" element={<UserLoged />} />
          <Route path="/accountActivated" element={<TokenVerificated />} />
          <Route path="/notConected" element={<NotConected />} />
        </Routes>
      </NativeRouter>
    </AuthProvider>
  );
}
