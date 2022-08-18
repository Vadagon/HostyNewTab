import React from 'react';

const ModalRowItem = (props) => {
  return (
    <div className="flex mb-5 justify-between">
      <div className="flex items-center">
        <div
          style={{ backgroundImage: 'url(' + props.img + ')' }}
          className="w-[12px] h-[12px] mr-3 -mt-1  bg-[length:12px_12px] bg-no-repeat bg-center"
        ></div>
        <div className="text-[13px] text-white">{props.title}</div>
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default ModalRowItem;
