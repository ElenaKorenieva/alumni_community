import styled from "@emotion/styled";
import "../../shared/variables.scss";

export const BackdropStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  background-color: var(--modal-backdrop-background-color);
  z-index: 100;
`;

export const ModalWindowStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  padding: 24px;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  background-color: var(--modal-window-color);
  box-shadow: 0px 4px 16px 0px rgba(22, 22, 22, 0.05);
  box-shadow: 0px 4px 16px 0px var(--modal-window-shadow);

  @media screen and (min-width: 375px) {
    width: 335px;
  }

  @media screen and (min-width: 768px) {
    width: ${(props) => (props.custom ? "400px" : "350px")};
  }

  @media screen and (max-height: 500px) and (orientation: landscape) {
    position: sticky;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0%);
  }
`;

export const CloseBtnStyled = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  transition: background-color 250ms ease-in;
  border-radius: 50%;
  background-color: transparent;

  &:hover,
  :focus {
    background-color: var(--secondary-button-color);
  }
`;

export const IconStyled = styled.svg`
  stroke: var(--modal-close-icon-color);
`;
