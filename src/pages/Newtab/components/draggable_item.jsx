import React, { useState } from 'react';
import edit from '../../../assets/img/edit.svg';
import amazon from '../../../assets/img/amazon.png';
import Draggable from 'react-draggable';
const DraggableItem = (props) => {
  return (
    <div>
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[50, 50]}
        scale={1}
        bounds={'body'}
      >
        <div className="drag_item handle rounded-md p-2 w-[80px] cursor-pointer flex justify-center items-center flex-col relative hover:bg-black hover:bg-opacity-40  duration-150">
          <div
            style={{ backgroundImage: 'url(' + edit + ')' }}
            className="edit_on_hover  w-[24px] bg-[length:14px_14px]  bg-center bg-no-repeat h-[24px] bg-black bg-opacity-40 rounded-full -top-3 -right-3 cursor-pointer delay-200 transition-all duration-150 flex opacity-0 pointer-events-none absolute justify-center items-center p-1 "
          ></div>
          <div
            className="rounded-full w-[64px] bg-cover bg-center bg-no-repeat h-[64px] "
            style={{ backgroundImage: 'url(' + amazon + ')' }}
          ></div>
          <div className="text-white text-sm">{props.title}</div>
        </div>
      </Draggable>
    </div>
  );
};

export default DraggableItem;
