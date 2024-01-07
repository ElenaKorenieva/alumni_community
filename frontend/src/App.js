import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLogin } from "./redux/auth/authSelectors";
import { PrivateRoute } from "./components/AuthRoutes";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signup/SignUpPage";
import HomePage from "./pages/home/HomePage";

function App() {
  const isAuth = useSelector(isLogin);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? <Navigate to="/home" replace={true} /> : <LoginPage />
          }
        />

        <Route
          path="/home"
          element={<PrivateRoute component={HomePage} redirectTo="/" />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
