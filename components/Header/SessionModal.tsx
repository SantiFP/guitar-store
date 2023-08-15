import { ReactNode } from "react";
import classes from "./SessionModal.module.css";

const ExpiredSession = (props: {
  children: ReactNode;
  onClose: () => void;
}) => {
  return (
    <>
      <div className={classes.backdrop} onClick={props.onClose}/>
      <div className={classes.modal}>{props.children}</div>;
    </>
  );
};
export default ExpiredSession;
