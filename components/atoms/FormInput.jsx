import React from "react";

const FormInput = ({ label, name, type, value, onChange }) => {
  return (
    <div className="form-input">
      <label className="form-input__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="form-input__input"
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default FormInput;
