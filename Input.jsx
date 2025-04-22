import React from "react";

export function Input({ value, onChange, placeholder, height }) {
  return (
    <input
      className={`bg-[#F3F4F6] border-none bg-third w-full ${height} rounded-[12px] pl-[24px]`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></input>
  );
}

