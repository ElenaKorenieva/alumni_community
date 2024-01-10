import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import FooterWithouAuth from "./shared/Footer/FooterWithouAuth";
import Loader from "./shared/Loader/Loader";

function App() {
  const isAuth = useSelector(isLogin);
  let isRefresh = useSelector(isRefreshing);
  const location = useLocation();
  const hideOnRoutes = ["/signup", "/login"];
  const [queryParameters] = useSearchParams();

  console.log(queryParameters);

  return isRefresh ? (
    <Loader />
  ) : (
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
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {isAuth ? <Footer style={{ display: "block" }} /> : null}
      {/* {!hideOnRoutes.includes(location.pathname) ? <Footer /> : <FooterWithouAuth />} */}
    </>
  );
}

export default App;
