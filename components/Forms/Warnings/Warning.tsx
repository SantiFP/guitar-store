import { ReactNode } from "react";

const Warning = (props: {
  isTouched: boolean;
  isOk: boolean;
  children: ReactNode;
}) => {
  const { isTouched, isOk, children } = props;

  return isTouched && !isOk ? (
    <p className="warning border-red-500 text-red-500">{children}</p>
  ) : (
    <p className="h-[5.4%]"></p>
  );
};
export default Warning;
