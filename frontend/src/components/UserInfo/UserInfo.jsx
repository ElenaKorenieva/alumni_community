import { useState } from "react";
import icons from "../../shared/images/sprite.svg";
import { useSelector } from "react-redux";
import { avatarURL, setName } from "../../redux/auth/authSelectors";
import ModalEditProfile from "../ModalEditProfile/ModalEditProfile";
import "./UserInfo.css";

const UserInfo = () => {
  const name = useSelector(setName);
  const avatar = useSelector(avatarURL);

  const [showModal, setShowModal] = useState(false);

  const onOpen = () => {
    setShowModal(true);
  };
  const onClose = () => {
    setShowModal(false);
  };

  return (
    <div className="user-container">
      <div className="user-name">{name ? name : "User"}</div>
      <div className="avatar" onClick={onOpen}>
        {avatar ? (
          <img className="avatar-img" src={avatar} alt="user avatar" />
        ) : (
          <svg className="icon-avatar">
            <use href={`${icons}#icon-user`}></use>
          </svg>
        )}
        <div>
          <svg className="icon-plus">
            <use href={`${icons}#icon-plus-01`}></use>
          </svg>
        </div>
      </div>
      {showModal && <ModalEditProfile onClose={onClose} />}
    </div>
  );
};

export default UserInfo;
