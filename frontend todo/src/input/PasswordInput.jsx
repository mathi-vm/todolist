import React from "react";

const PasswordInput = ({ value, onChange, placeholder }) => {
  return (
    <div>
      <input
        value={value}
        onChange={onChange}
        type="password"
        placeholder={placeholder || "Password"}
        className=" w-100 ps-1 pe-1   fs-6  bg-white  border-0"
        style={{ outline: "none" }}
      />
    </div>
  );
};

export default PasswordInput;