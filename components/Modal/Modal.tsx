import { ReactNode } from "react";
import classes from "./Modal.module.css";

export const Backdrop: React.FC<{ onClose: () => void }> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal: React.FC<{ children: ReactNode; onClose: () => void }> = (
  props
) => {
  return (
    <>
      <Backdrop onClose={props.onClose} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </>
  );
};

export default Modal;
