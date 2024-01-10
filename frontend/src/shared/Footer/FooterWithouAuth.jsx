import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer2 = () => {
    return (
        <footer2 className="footer2 text-center bg-dark text-light position-absolute w-100">
            <div className="footer-log">
                <p className="small mb-1">
                    <a
                        className="footer-link"
                        href="https://matrixmaster.info/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Matrix Master
                    </a>{" "}
                    © 2024
                </p>
                <p className="footer2-names small mb-1">
                    Developed by{" "}
                    <a className="small" href="https://www.linkedin.com/in/francielle-abreu">Francielle Abreu</a>{" "} and{" "}
                    <a className="small" href="https://www.linkedin.com/in/olena-korenieva-555391109/">Olena Korenieva</a>
                </p>
            </div>
        </footer2>

    );
};

export default Footer2;
