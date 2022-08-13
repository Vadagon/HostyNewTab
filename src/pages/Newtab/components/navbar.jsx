import React, { useState } from 'react';
import logo from '../../../assets/img/logo.svg';
import burger from '../../../assets/img/burger.svg';
import DraggableList from 'react-draggable-lists';
import DraggableListItem from './draggable_list_item';
const Navbar = () => {
  const listItems = ['Entertainment', 'Private Time'];
  return (
    <div className="navbar ">
      <div className="nav_header flex flex-none w-[220px] justify-between">
        <div className="w-[50px] h-[50px] ">
          <img src={logo} alt="" />
        </div>
        <div className="w-[50px] h-[50px] cursor-pointer flex justify-center items-center">
          <img src={burger} alt="" />
        </div>
      </div>
      <div className="nav_content ">
        <DraggableList width={220} height={60} rowSize={1}>
          {listItems.map((item, index) => (
            <DraggableListItem item={item} index={index} />
          ))}
        </DraggableList>
      </div>
      <div className="nav_footer absolute bottom-0">
        <div className="bg-blue-400 cursor-pointer h-[50px] flex justify-center items-center w-[220px] text-white">
          Add Folder
        </div>
      </div>
    </div>
  );
};

export default Navbar;
