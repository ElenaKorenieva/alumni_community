import { RotatingLines } from "react-loader-spinner";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <RotatingLines
        strokeColor="#7b7ede"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default Loader;
