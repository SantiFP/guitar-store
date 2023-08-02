export interface Form {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ActionType {
  type: string;
  payload?: any;
}

export interface Props {
  dispatch: (action: { type: string; payload: string }) => void;
  setInputsObject: (inputsObject: any) => void;
  setLevels: (levels: boolean) => void;
  touchedInput: string;
  type: string;
  placeholder: string;
  inputType: string;
  className: string;
}

export type StateType = {
  sideState: boolean;
};

export interface ItemObj {
  name: string;
  id: number;
  price: number;
  img: string;
  type: string;
}
