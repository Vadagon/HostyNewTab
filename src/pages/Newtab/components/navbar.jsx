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
import _ from 'lodash';

const Navbar = () => {
  var [modal, openModal] = useState(false);
  var [modalBookmarks, openModalBookmarks] = useState(false);
  var [actionedFolder, setActionedFolderIndex] = useState(0);
  var [modalAddFolder, openModalAddFolder] = useState(false);
  var [modalEditFolder, openModalEditFolder] = useState(false);
  var [folderIndex, setIndexFolder] = useState(0);

  const [colorFont, setColorFont] = useState('#ffffff');

  const [name, setName] = useState('');
  const [selectedBookmarks, setSelectedBookmarks] = useState([]);
  const [img, setImg] = useState('');

  const store = useContext(UserContext);
  const [imgEdit, setImgEdit] = useState(
    store.store.settings.folders[folderIndex].preview
  );
  const [colorFontEdit, setColorFontEdit] = useState(
    store.store.settings.folders[folderIndex].font_color
  );

  const [nameEdit, setNameEdit] = useState(
    store.store.settings.folders[folderIndex].name
  );
  var settingsSidebar = [
    i18n('general', store),
    i18n('search_box', store),
    i18n('background', store),
    // i18n('time', store),
    i18n('privacy_and_security', store),
  ];
  var addFolderSidebar = [i18n('general', store), i18n('bookmarks', store)];
  const SortableItem = SortableElement(({ value, keyIndex, preview }) => (
    <DraggableListItem
      edit_folder={() => {
        openModalEditFolder(!modalAddFolder);
        setIndexFolder(keyIndex);
      }}
      bookmarks={() => {
        openModalBookmarks(!modalBookmarks);
        setActionedFolderIndex(keyIndex);
      }}
      preview={preview}
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
            preview={value.preview}
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
          var bookmarks = [];

          if (e.e.target.checked) {
            bookmarks.push({
              id: e.i,
              position: { x: 0, y: 0 },
              name: e.e2.title,
              url: e.e2.url,
              preview: null,
            });
          } else {
            selectedBookmarks.splice(e.i, 1);
          }
          setSelectedBookmarks((oldArray) => [...oldArray, ...bookmarks]);
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
          // console.log(img);
          // console.log(colorFont);
          // console.log(name);
          // console.log(selectedBookmarks);
          var folder = {
            name: name,
            font_color: colorFont,
            preview: img,
            bookmarks: selectedBookmarks,
          };

          store.store.settings.folders.push(folder);
          save(store.store, store)
          console.log('add folder');
          setSelectedBookmarks([]);
          setColorFont('#ffffff');
          setName('');
          setImg('');
          openModalAddFolder(false);
        }}
      ></Modal>

      {/* Modal editFolder */}
      <Modal
        sidebar={addFolderSidebar}
        title={i18n('edit_folder', store)}
        open={modalEditFolder}
        onLoadImage={(e) => {
          setImgEdit(e);
        }}
        folder
        img={imgEdit}
        selectedBookmarks={selectedBookmarks}
        setSelectedBookmarks={(e) => {
          var bookmarks = [];

          if (e.e.target.checked) {
            bookmarks.push({
              id: e.i,
              position: { x: 0, y: 0 },
              name: e.e2.title,
              url: e.e2.url,
              preview: null,
            });
          } else {
            selectedBookmarks.splice(e.i, 1);
          }
          setSelectedBookmarks((oldArray) => [...oldArray, ...bookmarks]);
        }}
        // img={img}
        color={colorFontEdit}
        setColorFont={setColorFontEdit}
        openModal={openModalEditFolder}
        name={nameEdit}
        onChange={(e) => {
          console.log(store.store.settings.folders[folderIndex]);
          setNameEdit(e.target.value);
        }}
        confirm_click={() => {
          var storeClone = _.cloneDeep(store.store);
          storeClone.settings.folders[folderIndex].name = nameEdit;
          storeClone.settings.folders[folderIndex].font_color = colorFontEdit;
          storeClone.settings.folders[folderIndex].preview = imgEdit;
          storeClone.settings.folders[folderIndex].bookmarks.push(
            ...selectedBookmarks
          );

          console.log(selectedBookmarks);
          // save(storeClone, store);
          console.log('edit folder');
          openModalEditFolder(false);
        }}
      ></Modal>
    </div>
  );
};

export default Navbar;
