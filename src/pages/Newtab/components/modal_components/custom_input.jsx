import React from 'react';
const CustomInput = (props) => {
  return (
    <input
      className="border border-[#fff] h-[34px] w-[250px] py-2 px-3 text-[#929292] bg-[#2d2d2d]"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default CustomInput;
