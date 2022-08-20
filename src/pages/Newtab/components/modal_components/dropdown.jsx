import React, { useState } from 'react';

const Dropdown = (props) => {
  var [drop, openDropdown] = useState(false);
  var [selected, selectVal] = useState(0);
  return (
    <div
      onClick={() => {
        openDropdown(!drop);
      }}
      active={drop ? 'active' : ''}
      className="drop_down cursor-pointer rounded-md relative min-w-[160px] bg-[#464646] text-[#929292] p-2 border border-[#575757] flex flex-col"
    >
      <div className="drop_down_main">{props.data[selected]}</div>
      <div className="drop_down_tringle"></div>
      <div className={'drop_down_options'}>
        {props.data.map((item, i) => {
          if (item === props.data[selected]) {
            return false;
          }
          return (
            <div
              onClick={() => {
                selectVal(i);
              }}
              key={item}
              className={' px-2 py-1 '}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
