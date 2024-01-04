import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLogin } from "./redux/auth/authSelectors";
import { PrivateRoute, RestrictedRoute } from "./components/AuthRoutes";
import Home from "./components/Home/Home";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signup/SignUpPage";

function App() {
  const isAuth = useSelector(isLogin);
  return (
    // <div className="App">
    //   <header className="App-header"></header>
    //   <LoginPage />
    // </div>

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
          element={<PrivateRoute component={Home} redirectTo="/" />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
