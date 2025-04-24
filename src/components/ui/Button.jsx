"use client";

import React from "react";

function Button({
  text,
  onClick,
  disabled,
  width,
  height,
  rounded = "rounded-[8px]",
}) {
  return (
    <button
      className={`font-pretendard ${width} ${height} py-[11.5px] px-[23px] 
      ${rounded} cursor-pointer text-white flex justify-center items-center 
      ${disabled ? "bg-fifth text-third" : "bg-primary text-white"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
