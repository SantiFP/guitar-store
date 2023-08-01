interface Props {
  dispatch: (action: { type: string; payload: string }) => void;
  setInputsObject: (inputsObject: any) => void;
  setLevels: (levels: boolean) => void;
  touchedInput: string;
  type: string;
  placeholder: string;
  inputType: string;
  className: string;
}

const Input = (props: Props) => {
  const {
    dispatch,
    setInputsObject,
    touchedInput,
    type,
    placeholder,
    inputType,
    setLevels,
    className,
  } = props;

  return (
    <input
      onBlur={(e) => {
        dispatch({ type: type, payload: e.target?.value });
        setInputsObject((prevState: {}) => {
          return { ...prevState, [`${touchedInput}`]: true };
        });
        if (touchedInput === "input3Touched") {
          setLevels(true);
          setInputsObject((prevState: {}) => {
            return { ...prevState, [`${touchedInput}`]: false };
          });
        }
        touchedInput === "input3Touched" && setLevels(false);
      }}
      onChange={(e) => {
        dispatch({ type: type, payload: e.target?.value });
        if (touchedInput === "input3Touched") {
          setLevels(true);
          setInputsObject((prevState: {}) => {
            return { ...prevState, [`${touchedInput}`]: true };
          });
        }
      }}
      className={className}
      type={inputType}
      placeholder={placeholder}
    />
  );
};
export default Input;
