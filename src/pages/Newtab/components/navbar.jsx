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
    i18n('privacy_and_security', store),
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
    if (oldIndex === store.store.settings.activeFolder) { store.store.settings.activeFolder = newIndex; }
    else if (newIndex <= store.store.settings.activeFolder && oldIndex > store.store.settings.activeFolder) { store.store.settings.activeFolder++; }
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
              setSelectedBookmarks([])
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
              ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTQwRTgzQUI4QzZDMTFFQUExODNENDBFMzA3NzI1OUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTQwRTgzQUM4QzZDMTFFQUExODNENDBFMzA3NzI1OUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNDBFODNBOThDNkMxMUVBQTE4M0Q0MEUzMDc3MjU5QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNDBFODNBQThDNkMxMUVBQTE4M0Q0MEUzMDc3MjU5QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtT2hcgAAAt2SURBVHja7Jx5iF1XHce/Z7nn3vuWmcxkksmk6dikbeyS0EptXNoqrRHqH1pwQ6QU+k8VBSOI/+h//iFaUEEoFP1HBEHBWiittekqVtTurcSmbdI0ZLIvs7zlLmfzd96kaYQ2Tto3k3nDPVwe913m/c49n/M7v+Usw7z3qMrCCq8QVLAqWBWsClYFq4JVIahgVbAqWBWsClYFq0JQwapgVbAqWCuzyCWtzVkc+CuOvIiii8YEJj6KiWvPW8jeg5g6hY5GGuOSMWwcX6GwXr8fe/+Co6/CKagRHD+GdhuX33geEl55Hf85ioNdlAATONDBXIlrLl6a12dLNAefT+OJHTjxCiyHi4A6oMIn3a/Zilu/i6T+fyToEn94AAfn4FeBp/ASBjAWZY7Lx3HHx8HZSoH1p9sxexTWwXEYgpWCJ+D1oCC+hnQUd/4QQpxLwu/vw+7DQR8xDJYAETzvwcqgDa7YhDuvXhEGftf9mJsC9cp8x3AeLrq3Nnylz9kT+PvOc0l47jm89lr4lXPhOtPBjJ2W9sYM9s6uCJu1+xmYtWEAkmahBqZgE1iGsqcdZe81nt+Fm24NjX/X8tDTaMdojsLGYA14UkwaxQye2Ak4A53g2VlcOjz4mpW3wufZmkVQSEHIDJFaGQMhkWVotd5TQreAlOFXNFTnVekM1nmx7Q6Od1aEZrlxlCxwsRJCBSNlSK0ccgseh/vaCDolIvWeEtZfhRMaZQ3JatgaEIeHxqM06LKAu53C1FeEzRpZGzp/3r4Edi6Ao08qRRGaSvcqQpq8p4RN4z1N1Kf1aF4C/ZCe0FWWNCIxmawIzbr2s9jzZoDFoqBc5BALBFPlWGgqEpQSN287l4RPXI3nuyFiKFI4UkwJS2pFrlCgQ8g4xAhuHlsRmrVhEy7b2oPF3tGseV2LE8QxtmzGTdefS8JYHZ+cRJKc1qOgUCZo1ryG0vWVEYwuelvY0m0MefjPeHU3fM+LGQXtUchgtq7bjK99ekES7juMp06C1SHioE2FQ2ahLW4bwdeHl6AFbEl30ezahRd34djxYJVljImLsO0qXDl5HhJeauHpNt7S6JBnZLg0xfYGtsYrK905uxQljEMcQYr3K4EMlkfCELGlfHFW7c+q5rMqWBWsClYFq4JVIahgVbAqWANU+jZF47VhrpcM+PkJBTafHoQbjzMTm2fNnr+dqcQMC0xabC/ROf3XbwvyPaHzM2VnZyNn5LOwPLK8YLGdL+NfhzqF6ub8VEvXmxMqTjsF5cvKWjluVgkRW+504UptGYtUmsQRm+3YsZ8I1lhYHS+guNvHlD8773PNfG+GWpeduVZ99Thcb4KrNNq50BOyl2kLn0yK5B6+vGB1jhyvFzrhdU1qZYx0QjFVOAfDbO467S5nRsQCXujC6tKaHLyW5tMl3IL73aB1vFsKyYy2WRkJWavVAKGM8vPT955xw21pnbNeQFCiLlx51CdQy0yzGpdlXZ4VxpbxkIM4GfvpaNhJU/pYi8NeCcGHa7oem5jn3heFzn2hTDP1Cx+FHEdyFalodDQpUpgSNYlcozYUc4YoCqMwz3lumfZeOALnFYt47JedzdJ5cfTAydVr3tl54Jxn1rtQmJBcSslIJTQ1JCwXWmPb7U7L1Cf9QidqdOmHhtT8LHw3Q5llPo61KaMkEdy3W7k2hnNOdpKq5IzLSKpImrxYfrD86Ky1LGt4HwwEt4IHi0EDwzsZRoXkrDSsJHslhFTKejnXtnOGtGyhqzI6DD4ZppEZkSrpqxV+3qF3Ojl1g5Sq2UzIjnU6pj3bpodja1b7om8ev2/zWW7GmFkXTG/PDQnGui+Xx3/T5aEOeaKo1dK4OdFd972ot+4nSLuM8WHRdZIsy8KqaHt9iEYteupDptFjju/5dpaScczbUUQalg5vY/Vv0Z/C2qDSNPYZjdHJZaZZfJVUq/7niWjzOVuyUCLSOetQKBFtjM5UfL518waLN5+xb2w+hiCbmMFFshYnUan9LMvqG4PHEOCi31HkIi6F6RlT5AWhEqES4uVtbvtbhZ8GGXwlZSzDIhHnzOWDEJS+i/Oyop2R6Y0imYSNDQUobu1/A6jwEJm2OvAGw2m6eC1axHTHWacpACWN8p6sb57nZan7Xkuno6enjTY4dPDU/rcOZd1iIDWLcSWwxpYoLHQiKULIWf+rGxqKWtM4eVyPjoxihNTZDKRmkT8ilyWjsP/FGNPbVtXnlSSSV+RhZZpcoQu5DsV2bjBtFniXHFJvZ5Hm5PIpn0PfYc3Mhr1/9RqKwuvS1DQbSFiUxoZQO0drruS1rGy7RtiOoPpbS0mZeWmlYGQcmQsh2EDCygWORegY11ZFrbRk3Znt/xYqwzilNrowMlJJnanFXMlf1NDBd7sGTDSbDVVk1OdC9Lk618tAi6Ikf1sLYb1wdjBh5XCH7RylgZTp1EQskpqXZZ8dbtjEy4wNEwxahlQryz0gBg8W5YjU56WxpFOlFomibu+/q4oUXZFklKAzyq2NHkxYZS6SeCKSmD2FvIbpQ/k1E33eyUgudjYralFspPCeNMtxIQdyGIa534wZifFxdHKkaZLnrr+RnbfIO6VQIT5xpMqcaPmBhNUYZtrrqUPTXTsmIp4bc+hQCxRl99GHdD0lOlYidUxQYSwdFQMJK6ojzwsZyd4aD8JN2czbPmn0LW4sDoIQhRlRHzJqLlm6dhG94SKGcKMXe1b3I+sbHZNNt/JWlqWj8ti+fkbYJ18iwy40paE5iwyLHGqbBxPW0CibvDyp11W3m83MzM3Otiign/p3P6s4sNOQB6Qsp5tleaZL7dOPDCYsKuu3OBZjbMPoyPjo0FAjy/HsQ30Trqex51FTGpcZR7GvBVMbmPrQwMLa9pk4zxz1fb0uKdqampr+52MzR9/oj/DdPw/L2h5h0VtFUaTkRbctamsWGdaWGxA1eCsvhxNMrk3WrRqJmLz3m9kHl9zdj/2/Q70RR5QhDEW2oboSq28fZFgyxnXbbaxUliEvwlqWtW7Pi+bBuz9Q3uMNnvxyOEdG8XqSxJQ8S8HW3YRk4yDDovLFu0QtSUQHqkDiWM3HQyp+5G7+xM/ev6l67BbX2Yduu3BGN+o8UWhzt/mni75HfdFh1VfhqzsoSdS94zpeCE72RSn54I/9/TuQzZxnrPAk/rg1P/yCts6RHyRrlSTh6M6Wb/DappVyRvqe27L9z8mytLrwtTRVQNaFsD6q2y/8QF71JQydcx3UWRx53O79lT31N3VyuhVxHscq13mtltZH5NCVuOGBJWjEUsGyBr+4xU69qglWo56mHN0ubEgVMTZMgTc2XI8NH3Pjm3lzA+ImvEA254vjvjvF5vawqUcw+2YutRtfU+u0rfdWUObMnFJROontT4XDdSsHVkhN5nDv5/W+581wM03i8A8dTBfauFUpF5zyYVe6rE5jVHJjyzKylHjXlVQG3FplIZ2LtGs2YynCwoTRhqdy6BJ2w4NMjS1NC5Zwm2Q8hO88Hl25PRwWnD+8am3oJ2PJqZ1e+DHeGhtmptpFNxg4SX9s2u0O5QD03Dvf7RS989GMvk7cyD71xNKRwgU56PTSb/Hoj3ByKhzpopbL3iFNGfbtWWe14CwRcUe3Eh5TVBA2WWpDbykjpIoLwVLBvSyv/T4+vEMt8ZtfmFNh+Qz+8Us882vMHUOEcKSe2q2DLTKSYCk5r/D+9MQIWTDiaiXs6EVqyx3YeBfU6qV/6wt6hM7k2PMw3tqJA89i5g3oArkNJ6cpyh8blXlGAYeJwCLF1l/B112Hi2/26z/HouaFet/lcd6wbGFuH07uRvuwy2a8N5wiciZ81PTNdWzsCtbciGj4gr9mdThzeXrDClYFqyoVrApWBauCVcGqYFWlglXBqmBVsCpYFayqVLAqWBWs5Vr+K8AA1fq99Il7gyMAAAAASUVORK5CYII='
              : img,
            bookmarks: selectedBookmarks.filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i).filter((v, i, a) => a.findIndex(v2 => (v2.url === v.url)) === i),
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
            var maxId = Math.max(0, ...store.store.settings.folders[folderIndex].bookmarks.map(e => e.id))
            console.log(maxId, maxId + e.i)
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
          storeClone.settings.folders[folderIndex].bookmarks = storeClone.settings.folders[folderIndex].bookmarks.filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i).filter((v, i, a) => a.findIndex(v2 => (v2.url === v.url)) === i);

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
