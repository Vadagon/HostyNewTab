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
  var [actionedFolder, setActionedFolderIndex] = useState(0);
  var [modalAddFolder, openModalAddFolder] = useState(false);

  const [colorFont, setColorFont] = useState('#ffffff');
  const [name, setName] = useState('');
  const [selectedBookmarks, setSelectedBookmarks] = useState('');
  const [img, setImg] = useState('');

  const store = useContext(UserContext);

  var settingsSidebar = [
    i18n('general', store),
    i18n('search_box', store),
    i18n('background', store),
    // i18n('time', store),
    i18n('privacy_and_security', store),
  ];
  var addFolderSidebar = [i18n('general', store), i18n('bookmarks', store)];
  const SortableItem = SortableElement(({ value, keyIndex }) => (
    <DraggableListItem
      edit_folder={() => {
        openModalAddFolder(!modalAddFolder);
      }}
      bookmarks={() => {
        openModalBookmarks(!modalBookmarks);
        setActionedFolderIndex(keyIndex);
      }}
      item={value}
      keyIndex={keyIndex}
    />
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${value.name}-${index}`}
            index={index}
            keyIndex={index}
            value={value.name}
          />
        ))}
      </ul>
    );
  });

  function onSortEnd({ oldIndex, newIndex }) {
    store.store.settings.folders = arrayMove(
      store.store.settings.folders,
      oldIndex,
      newIndex
    );
    save(store.store, store);
    // console.log(oldIndex, newIndex)
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
            items={store.store.settings.folders}
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
          store.store.settings.folders[actionedFolder].bookmarks.forEach(
            (e) => e.url?.length > 5 && window.open(e.url, '_blank')
          );
          openModalBookmarks(false);
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
        onLoadImage={(e) => {
          setImg(e);
        }}
        selectedBookmarks={selectedBookmarks}
        setSelectedBookmarks={(e) => {
          console.log(e.e.target.checked);
          console.log(e.e2);
          console.log(e.i);
          // if (e.target.checked) {
          //   var bookmarks = [];
          //   bookmarks.push({
          //     id: i,
          //     position: { x: 0, y: 0 },
          //     name: e2.title,
          //     url: e2.url,
          //     preview: null,
          //   });
          // } else {
          //   bookmarks.splice(i, 1);
          // }
          // setSelectedBookmarks(e)
        }}
        img={img}
        color={colorFont}
        setColorFont={setColorFont}
        openModal={openModalAddFolder}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        confirm_click={() => {
          console.log(img);
          console.log(colorFont);
          console.log(name);
          // var text = {
          //   name: 'Test Folder 123',
          //   font_color: '#ffffff',
          //   preview: null,
          //   index: 0,
          //   bookmarks: [
          //     {
          //       id: 0,
          //       position: { x: 4, y: 4 },
          //       name: 'Amazon',
          //       url: 'https://www.amazon.com/',
          //       preview: null,
          //     },
          //     {
          //       id: 1,
          //       position: { x: 5, y: 7 },
          //       name: null,
          //       url: null,
          //       preview: null,
          //     },
          //     {
          //       id: 2,
          //       position: { x: 6, y: 4 },
          //       name: null,
          //       url: null,
          //       preview: null,
          //     },
          //     {
          //       id: 3,
          //       position: { x: 7, y: 7 },
          //       name: null,
          //       url: null,
          //       preview: null,
          //     },
          //     {
          //       id: 4,
          //       position: { x: 8, y: 4 },
          //       name: null,
          //       url: null,
          //       preview: null,
          //     },
          //   ],
          // };

          // store.store.settings.folders.push(text);
          console.log('add folder');
        }}
      ></Modal>
    </div>
  );
};

export default Navbar;
