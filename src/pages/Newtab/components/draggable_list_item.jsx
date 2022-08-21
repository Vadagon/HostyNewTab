import folder from '../../../assets/img/welcome-folder.png';
import open_all from '../../../assets/img/open_all.svg';
import edit_tab from '../../../assets/img/edit_tab.svg';
import move_folder from '../../../assets/img/move_folder.svg';
import { sortableHandle } from 'react-sortable-hoc';
import React, { useContext } from 'react';
import { UserContext } from '../context';
import { save } from '../../../components/Store/Store';

const DragHandle = sortableHandle(() => (
  <div
    style={{ backgroundImage: 'url(' + move_folder + ')' }}
    className="w-[24px] bg-[length:14px_14px] bg-center bg-no-repeat h-[24px] cursor-pointer flex justify-center items-center p-1 mr-1"
  ></div>
));
const DraggableListItem = (props) => {
  const storage = useContext(UserContext);
  return (
    <li
      className="bg-[#313131] flex h-full cursor-pointer items-center p-[10px] max-w-[220px] z-50"
      key={JSON.stringify(props)}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          storage.store.settings.activeFolder = props.keyIndex;
          save(storage.store, storage);
        }
      }}
    >
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            storage.store.settings.activeFolder = props.keyIndex;
            save(storage.store, storage);
          }
        }}
        style={{ backgroundImage: 'url(' + folder + ')' }}
        className="w-[30px] flex-none h-[30px] rounded-full bg-cover overflow-hidden mr-3"
      ></div>
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            storage.store.settings.activeFolder = props.keyIndex;
            save(storage.store, storage);
          }
        }}
        className="text-xs w-[85px] overflow-hidden flex-none whitespace-nowrap text-[#818181] text-ellipsis"
      >
        {`${props.item}`}
      </div>
      <div className="manage flex">
        <div
          onClick={() => {
            props.bookmarks();
          }}
          style={{ backgroundImage: 'url(' + open_all + ')' }}
          className="w-[24px] h-[24px] bg-[length:14px_14px] bg-center bg-no-repeat cursor-pointer flex justify-center items-center p-1 mr-1"
        ></div>
        <div
          onClick={() => {
            props.edit_folder();
          }}
          style={{ backgroundImage: 'url(' + edit_tab + ')' }}
          className="w-[24px] h-[24px] bg-[length:14px_14px] bg-center bg-no-repeat cursor-pointer flex justify-center items-center p-1 mr-1"
        ></div>
        <DragHandle />
      </div>
    </li>
  );
};

export default DraggableListItem;
