import EditUser from "../EditUser/EditUser";
import Modal from "../Modal/Modal";
import ModalTitle from "../ModalTitle/ModalTitle";

const ModalEditProfile = ({ onClose }) => {
  return (
    <Modal onClose={onClose} custom={true}>
      <ModalTitle>Edit profile</ModalTitle>
      <EditUser onClose={onClose} />
    </Modal>
  );
};

export default ModalEditProfile;
