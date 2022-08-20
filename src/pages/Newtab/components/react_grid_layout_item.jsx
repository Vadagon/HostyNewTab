import React from 'react';
import edit from '../../../assets/img/edit.svg';
import amazon from '../../../assets/img/amazon.png';
const ReactGridLayoutItem = (props) => {
  return (
    <div className="h-full flex w-full">
      <div className="drag_item handle rounded-md p-2 h-full  w-full cursor-pointer flex justify-center items-center flex-col relative hover:bg-black hover:bg-opacity-40  duration-150">
        <div
          style={{ backgroundImage: 'url(' + edit + ')' }}
          onClick={() => {
            props.openModal(true);
          }}
          className="edit_on_hover  w-[24px] bg-[length:14px_14px]  bg-center bg-no-repeat h-[24px] bg-black bg-opacity-40 rounded-full -top-3 -right-3 cursor-pointer delay-200 transition-all duration-150 flex opacity-0 pointer-events-none absolute justify-center items-center p-1 "
        ></div>
        <div className="w-full flex justify-center min-h-[64px]">
          <div
            className="  bg-cover  rounded-md bg-center w-full h-full max-w-[64px] bg-no-repeat  "
            style={{ backgroundImage: 'url(' + amazon + ')' }}
          ></div>
        </div>
        <div className="text-white text-sm mt-[10%]">{props.title}</div>
      </div>
    </div>
  );
};

export default ReactGridLayoutItem;
