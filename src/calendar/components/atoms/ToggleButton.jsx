import React from "react";

export const ToggleButton = (props) => {
  return (
    <>
      <label htmlFor="toggle-switch"></label>
      <input
        type="checkbox"
        id="toggle-switch"
        className="cursor-pointer rounded-full h-6 w-12 appearance-none bg-white"
      />
    </>
  );
};
