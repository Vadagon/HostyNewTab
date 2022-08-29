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

  const [nameEdit, setNameEdit] = useState('');
  // store.store.settings.folders[folderIndex].name
  var settingsSidebar = [
    i18n('general', store),
    i18n('search_box', store),
    i18n('background', store),
    // i18n('time', store),
    // i18n('privacy_and_security', store),
  ];
  var addFolderSidebar = [i18n('general', store), i18n('bookmarks', store)];
  const SortableItem = SortableElement(({ value, keyIndex, preview }) => (
    <DraggableListItem
      edit_folder={() => {
        setIndexFolder(keyIndex);
        setNameEdit(store.store.settings.folders[keyIndex].name);
        setColorFontEdit(store.store.settings.folders[keyIndex].font_color);
        setImgEdit(store.store.settings.folders[keyIndex].preview);
        openModalEditFolder(!modalAddFolder);
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
    if (oldIndex === store.store.settings.activeFolder) {
      store.store.settings.activeFolder = newIndex;
    } else if (
      newIndex <= store.store.settings.activeFolder &&
      oldIndex > store.store.settings.activeFolder
    ) {
      store.store.settings.activeFolder++;
    }
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
            className="w-[50px] h-[50px] bg-cover "
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
        <div className="nav_footer absolute bottom-0 p-5">
          <div
            onClick={() => {
              openModalAddFolder(!modalAddFolder);
              setSelectedBookmarks([]);
            }}
            className="bg-[#2d2d2d] cursor-pointer h-[50px] flex justify-center items-center w-[180px]    text-white"
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
        folderIndex={null}
        setColorFont={setColorFont}
        openModal={openModalAddFolder}
        name={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        confirm_click={() => {
          // console.log(img);
          // console.log(colorFont);
          // console.log(name);
          // console.log(selectedBookmarks);
          var folder = {
            name: !name ? 'Folder' : name,
            font_color: colorFont,
            preview: !img
              ? 'data:image/png;base64,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'
              : img,
            bookmarks: selectedBookmarks
              .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
              .filter((v, i, a) => a.findIndex((v2) => v2.url === v.url) === i),
          };
          store.store.settings.folders.push(folder);
          save(store.store, store);
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
        folderIndex={folderIndex ? folderIndex : 0}
        setSelectedBookmarks={(e) => {
          var bookmarks = [];

          if (e.e.target.checked) {
            var maxId = Math.max(
              0,
              ...store.store.settings.folders[folderIndex].bookmarks.map(
                (e) => e.id
              )
            );
            console.log(maxId, maxId + e.i);
            bookmarks.push({
              id: maxId + e.i,
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
          storeClone.settings.folders[folderIndex].bookmarks =
            storeClone.settings.folders[folderIndex].bookmarks
              .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
              .filter((v, i, a) => a.findIndex((v2) => v2.url === v.url) === i);

          console.log(selectedBookmarks);
          save(storeClone, store);
          console.log('edit folder');
          openModalEditFolder(false);
        }}
      ></Modal>
    </div>
  );
};

export default Navbar;
