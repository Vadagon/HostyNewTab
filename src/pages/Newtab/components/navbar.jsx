import React, { useContext, useState } from 'react';
import logo from '../../../assets/img/logo.svg';
import burger from '../../../assets/img/burger.svg';
import DraggableListItem from './draggable_list_item';
import Modal from './modal';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';
import { i18n } from '../../../components/Translation/Translation';
import { UserContext } from '../context';
import { save } from '../../../components/Store/Store';

const Navbar = () => {
  var [modal, openModal] = useState(false);
  var [modalBookmarks, openModalBookmarks] = useState(false);
  var [modalAddFolder, openModalAddFolder] = useState(false);
  const store = useContext(UserContext);
  const [listItems, changeOrder] = useState([
    'Private Time',
    'EntertainmentEntertainment',
    '12345',
    'gggggg',
  ]);
  var settingsSidebar = [
    i18n('general', store),
    i18n('search_box', store),
    i18n('background', store),
    i18n('time', store),
    i18n('privacy_and_security', store),
  ];
  var addFolderSidebar = ['General', 'Bookmarks'];
  const SortableItem = SortableElement(({ value }) => (
    <DraggableListItem
      edit_folder={() => {
        openModalAddFolder(!modalAddFolder);
      }}
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
    // store.store.settings['folders_order'] = listItems;
    // save(store.store, store);
  }
  return (
    <div>
      <div className="navbar ">
        <div className="nav_header flex flex-none w-[220px] justify-between">
          <div
            className="w-[50px] h-[50px] "
            style={{ backgroundImage: 'url(' + logo + ')' }}
          >
            {/* <img src={logo} alt="" /> */}
          </div>
          <div
            onClick={() => {
              openModal(!modal);
            }}
            className="w-[50px] h-[50px] cursor-pointer flex justify-center items-center"
          >
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
            {i18n('add_folder', store)}
          </div>
        </div>
      </div>
      <Modal
        settings
        sidebar={settingsSidebar}
        title={i18n('settings', store)}
        open={modal}
        openModal={openModal}
        confirm_click={() => {
          console.log('save settings');
        }}
      ></Modal>
      <Modal
        confirm_text={'Open'}
        title={i18n('open_bookmarks', store)}
        confirm_click={() => {
          console.log('asd');
        }}
        nosidebar
        open={modalBookmarks}
        openModal={openModalBookmarks}
      >
        <div className="text-white">{i18n('open_bookmars_text', store)}</div>
      </Modal>

      {/* click Add Folder modal*/}
      <Modal
        sidebar={addFolderSidebar}
        title={i18n('add_folder', store)}
        open={modalAddFolder}
        openModal={openModalAddFolder}
        confirm_click={() => {
          console.log('add folder');
        }}
      ></Modal>
    </div>
  );
};

export default Navbar;
