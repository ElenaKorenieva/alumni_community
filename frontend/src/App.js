import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import LoginPage from "../src/pages/login/LoginPage";
import PostsPage from "./pages/posts/PostsPage";
import { useSelector } from "react-redux";
import { isLogin, isRefreshing } from "./redux/auth/authSelectors";
import { PrivateRoute } from "./components/AuthRoutes";
import SignUpPage from "./pages/signup/SignUpPage";
import HomePage from "./pages/home/HomePage";
import About from "./pages/about/About";
import Header from "./shared/Header/Header";
import Profile from "./pages/profile/Profile";
import Footer from "./shared/Footer/Footer";
import Loader from "./shared/Loader/Loader";

function App() {
  const isAuth = useSelector(isLogin);
  let isRefresh = useSelector(isRefreshing);
  const location = useLocation();
  let isProfilePage = location.pathname === "/profile";

  // return isRefresh && !isProfilePage ? (
  //   <Loader />
  // ) : (
  return (
    <>
      {/* {!hideOnRoutes.includes(location.pathname) && <Header />} */}
      {isAuth ? <Header style={{ display: "block" }} /> : null}
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
        <Route path="/about" element={<About />} />
        <Route path="/posts/:topic" element={<PostsPage />} />
        <Route path="/login" element={isAuth ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/signup" element={isAuth ? <Navigate to="/home" /> : <SignUpPage />} />
        <Route path="/logout" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer style={{ display: "block" }} />
      {/* {isAuth ? <Footer style={{ display: "block" }} /> : null} */}
      {/* {!hideOnRoutes.includes(location.pathname) ? <Footer /> : <Footer />} */}
    </>
  );
  //   <>
  //     {/* {!hideOnRoutes.includes(location.pathname) && <Header />} */}
  //     {isAuth ? <Header style={{ display: "block" }} /> : null}
  //     <Routes>
  //       <Route
  //         path="/"
  //         element={
  //           isAuth ? <Navigate to="/home" replace={true} /> : <LoginPage />
  //         }
  //       />

  //       <Route
  //         path="/home"
  //         element={<PrivateRoute component={HomePage} redirectTo="/" />}
  //       />
  //       <Route path="/about" element={<About />} />
  //       <Route path="/posts/:topic" element={<PostsPage />} />
  //       <Route path="/signup" element={<SignUpPage />} />
  //       <Route path="/login" element={<LoginPage />} />
  //       <Route path="/logout" element={<LoginPage />} />
  //       <Route path="/profile" element={<Profile />} />
  //     </Routes>
  //     <Footer style={{ display: "block" }} />
  //     {/* {isAuth ? <Footer style={{ display: "block" }} /> : null} */}
  //     {/* {!hideOnRoutes.includes(location.pathname) ? <Footer /> : <Footer />} */}
  //   </>
  // );
}

export default App;
