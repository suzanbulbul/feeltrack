import React from "react";
import PropTypes from "prop-types";

const Input = ({id,type,placeholder,className, value, onChange,onFocus,error, errorText, icon }) => {

    return (
    <div className="input input-icon mr-10">
        {icon}
        <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`input ${className}`}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        />
        {error && <span className="text-red-500">{errorText}</span>}
    </div>
);
}
Input.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    error: PropTypes.bool,
    errorText: PropTypes.string,
    icon: PropTypes.element,
    };
  
  Input.defaultProps = {
    id: '',
    type: 'text',
    placeholder: '',
    className: '',
    value: '',
    onChange: () => {},
    onFocus: () => {},
    error: false,
    errorText: '',
    icon: '',
  };

export default Input;
