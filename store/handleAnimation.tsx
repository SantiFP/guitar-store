import { AppDispatch } from ".";
import { animationActions } from "./animation";

interface Animate{
  type:string,
  id:number
}
export const handleAnimation = (type:Animate) => {
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
