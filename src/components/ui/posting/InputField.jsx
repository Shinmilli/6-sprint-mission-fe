import React from "react";

function InputField({ value, onChange, placeholder, height }) {
  return (
    <input
      className={`bg-third w-[1200px] ${height} rounded-[12px] pl-[24px]`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></input>
  );
}

export default InputField;
