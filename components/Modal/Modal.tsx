import { ReactNode } from "react";
import classes from "./Modal.module.css";

export const Backdrop: React.FC<{ onClose: () => void }> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay: React.FC<{
  children: ReactNode;
  cartLength: number;
}> = (props) => {

  return (
    <>
      <div className={`${classes.modal} lg:hidden`}>
        <div>{props.children}</div>
      </div>
      <div className={`hidden lg:block ${props.cartLength > 0 ? classes.modal : classes.modalEmpty}`}>
        <div>{props.children}</div>
      </div>
    </>
  );
};

const Modal: React.FC<{
  children: ReactNode;
  onClose: () => void;
  cartLength: number;
}> = (props) => {
  return (
    <>
      <Backdrop onClose={props.onClose} />

      <ModalOverlay cartLength={props.cartLength}>
        {props.children}
      </ModalOverlay>
    </>
  );
};

export default Modal;
