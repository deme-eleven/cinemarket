import React from "react";

type InputProps = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
type useInputProps = {
  label: string;
};

export const useInput = (props: useInputProps) => {
  const [value, setValue] = React.useState("");
  const textChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const element = <Input onChange={textChange} label={props.label} />;
  return { element, value };
};

export default function Input(props: InputProps) {
  return (
    <div className="input-container">
      <label>{props.label}</label>
      <input onChange={props.onChange} type="text" />
    </div>
  );
}
