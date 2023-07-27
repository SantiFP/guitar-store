import { AppDispatch } from ".";
import { animationActions } from "./animation";

export const handleAnimation = (type:string) => {
  return (dispatch: AppDispatch) => {
    dispatch(animationActions.toggleAnimation(type));
    const timer = setTimeout(() => {
      dispatch(animationActions.toggleAnimation(type));
    }, 400);
    setTimeout(() => {
      clearInterval(timer);
    }, 500);
  };
};
