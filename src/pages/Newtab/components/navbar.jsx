import React, { useState } from 'react';
import logo from '../../../assets/img/logo.svg';
import burger from '../../../assets/img/burger.svg';
import DraggableListItem from './draggable_list_item';
import Modal from './modal';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';

const Navbar = () => {
  var [modal, openModal] = useState(false);
  var [modalBookmarks, openModalBookmarks] = useState(false);
  var [modalAddFolder, openModalAddFolder] = useState(false);
  const [listItems, changeOrder] = useState([
    'Private Time',
    'EntertainmentEntertainment',
    '12345',
    'gggggg',
  ]);
  var settingsSidebar = [
    'General',
    'Search Box',
    'Background',
    'Time',
    'Privacy and Security',
  ];
  var addFolderSidebar = ['General', 'Bookmarks'];
  const SortableItem = SortableElement(({ value }) => (
    <DraggableListItem
      bookmarks={() => {
        openModalBookmarks(!modalBookmarks);
      }}
      item={value}
    />
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

  function onSortEnd({ oldIndex, newIndex }) {
    changeOrder(arrayMove(listItems, oldIndex, newIndex));
    console.log(listItems);
  }
  return (
    <div>
      <div className="navbar ">
        <div
          onClick={() => {
            openModal(!modal);
          }}
          className="nav_header flex flex-none w-[220px] justify-between"
        >
          <div
            className="w-[50px] h-[50px] "
            style={{ backgroundImage: 'url(' + logo + ')' }}
          >
            {/* <img src={logo} alt="" /> */}
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
            useDragHandle={true}
            items={listItems}
            onSortEnd={(e) => onSortEnd(e)}
          />
        </div>
        <div className="nav_footer absolute bottom-0">
          <div
            onClick={() => {
              openModalAddFolder(!modalAddFolder);
            }}
            className="bg-blue-400 cursor-pointer h-[50px] flex justify-center items-center w-[220px] text-white"
          >
            Add Folder
          </div>
        </div>
      </div>
      <Modal
        settings
        sidebar={settingsSidebar}
        title={'Settings'}
        open={modal}
        openModal={openModal}
      ></Modal>
      <Modal
        nosidebar
        open={modalBookmarks}
        openModal={openModalBookmarks}
      ></Modal>

      {/* click Add Folder modal*/}
      <Modal
        sidebar={addFolderSidebar}
        title={'Add Folder'}
        open={modalAddFolder}
        openModal={openModalAddFolder}
      ></Modal>
    </div>
  );
};

export default Navbar;
