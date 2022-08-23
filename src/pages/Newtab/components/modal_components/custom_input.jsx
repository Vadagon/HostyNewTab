import React from 'react';
const CustomInput = (props) => {
  return (
    <input
      className="border border-[#575757] h-[34px] w-[250px] py-2 px-3 text-[#929292] bg-[#464646]"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default CustomInput;
