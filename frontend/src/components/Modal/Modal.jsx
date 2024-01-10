import { useEffect } from "react";
import sprite from "../../shared/images/sprite.svg";
import "./Modal.css";

const Modal = ({ children, onClose, custom }) => {
  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  const onCloseBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      onClose();
    }
  };

  function onCloseEscape(e) {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onCloseEscape);
    return () => {
      window.removeEventListener("keydown", onCloseEscape);
    };
  });

  return (
    <div className="backdrop" onClick={onCloseBackdrop}>
      <div className="modal-window">
        <div className="close-btn" onClick={handleClose}>
          <svg className="icon-styled" width={18} height={18}>
            <use href={`${sprite}#icon-close`}></use>
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
