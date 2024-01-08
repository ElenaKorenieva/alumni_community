import { useEffect, useState } from "react";
import icons from "../../shared/images/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import { avatarURL, gitHubURL, setName } from "../../redux/auth/authSelectors";
import ModalEditProfile from "../ModalEditProfile/ModalEditProfile";
import "./UserInfo.css";
// import { getImageFromGitHub } from "../../redux/auth/authOperations";

const UserInfo = () => {
  // const dispatch = useDispatch();

  const name = useSelector(setName);
  const avatar = useSelector(avatarURL);
  // const gitHubLink = useSelector(gitHubURL) || "";
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   // Dispatch the fetchData thunk only on the first render
  //   dispatch(getImageFromGitHub(gitHubLink));
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
