import folder from '../../../assets/img/welcome-folder.png';
import open_all from '../../../assets/img/open_all.svg';
import edit_tab from '../../../assets/img/edit_tab.svg';
import move_folder from '../../../assets/img/move_folder.svg';

import React, { useState } from 'react';
const DraggableListItem = (props) => {
  return (
    <li
      className="bg-[#313131] flex h-full items-center p-[10px] max-w-[220px]"
      key={props.index}
    >
      <div className="w-[30px] flex-none h-[30px] rounded-full overflow-hidden mr-3">
        <img src={folder} alt="" />
      </div>
      <div className="text-xs w-[85px] overflow-hidden flex-none whitespace-nowrap text-[#818181] text-ellipsis">
        {`${props.item}`}
      </div>
      <div className="manage flex">
        <div className="w-[24px] h-[24px] cursor-pointer flex justify-center items-center p-1 mr-1">
          <img src={open_all} alt="" />
        </div>
        <div className="w-[24px] h-[24px] cursor-pointer flex justify-center items-center p-1 mr-1">
          <img src={edit_tab} alt="" />
        </div>
        <div className="w-[24px] h-[24px] cursor-pointer flex justify-center items-center p-1 mr-1">
          <img src={move_folder} alt="" />
        </div>
      </div>
    </li>
  );
};

export default DraggableListItem;
