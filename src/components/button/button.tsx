import React from "react";
import { MdClose, MdLocalOffer } from "react-icons/md";

type ButtonProps = {
  text: string;
  onClick: () => void;
  alternate?: boolean;
  icon?: "close" | "offer";
};

export default function Button(props: ButtonProps) {
  const getIcon = () => {
    switch (props.icon) {
      case "close":
        return <MdClose />;
      case "offer":
        return <MdLocalOffer />;
      default:
        return null;
    }
  };
  return (
    <div
      onClick={props.onClick}
      className={`button ${props.alternate ? "alternate" : ""}`}
    >
      {props.icon ? getIcon() : null}
      {props.text}
    </div>
  );
}
