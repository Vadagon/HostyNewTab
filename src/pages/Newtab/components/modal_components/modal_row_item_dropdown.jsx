import React, { useState } from 'react';
import arrow from '../../../../assets/img/arrow.svg';

const ModalRowItemDropdown = (props) => {
  var [open, openDropdown] = useState(false);
  return (
    <div className="flex-col relative">
      <div
        onClick={() => {
          openDropdown(!open);
        }}
        className="flex  mb-5 cursor-pointer items-center h-[36px] justify-between"
      >
        <div className="flex items-center">
          {props.img && (
            <div
              style={{ backgroundImage: 'url(' + props.img + ')' }}
              className="w-[12px] h-[12px] mr-3 -mt-1  bg-[length:12px_12px] bg-no-repeat bg-center"
            ></div>
          )}
          <div className="text-[13px] text-white">{props.title}</div>
        </div>
        <div
          active={open ? 'true' : ''}
          style={{ backgroundImage: 'url(' + arrow + ')' }}
          className="arrow_down transition-all w-[12px] h-[12px] mr-3 -mt-1  bg-[length:12px_12px] bg-no-repeat bg-center"
        ></div>
      </div>
      {
        <div active={open ? 'true' : ''} className="drop_down_bg">
          {props.children}
        </div>
      }
    </div>
  );
};

export default ModalRowItemDropdown;
