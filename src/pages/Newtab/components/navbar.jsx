import React, { useState } from 'react';
import logo from '../../../assets/img/logo.svg';
import burger from '../../../assets/img/burger.svg';
import DraggableListItem from './draggable_list_item';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
const Navbar = () => {
  const SortableItem = SortableElement(({ value }) => (
    <DraggableListItem item={value} />
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} />
        ))}
      </ul>
    );
  });
  const listItems = ['EntertainmentEntertainment', 'Private Time'];

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
        {/* <DraggableList width={220} height={60} rowSize={1}>
          {listItems.map((item, index) => (
            <DraggableListItem item={item} index={index} />
          ))}
        </DraggableList> */}
        <SortableList
          items={listItems}
          onSortEnd={(e) => {
            console.log(e);
          }}
        />
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
