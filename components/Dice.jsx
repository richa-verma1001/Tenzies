import React from "react";

export default function Dice({ id, value, fixed, handleClick }) {
  // const [fixed, setFixed] = React.useState(() => true);
  // const [value, setValue] = React.useState(
  //   () => Math.floor(Math.random() * 6) + 1
  // );

  return (
    <div
      id={id}
      className={fixed ? "diceBoard__dice fixed" : "diceBoard__dice"}
      onClick={() => handleClick(id)}
    >
      {value}
    </div>
  );
}
