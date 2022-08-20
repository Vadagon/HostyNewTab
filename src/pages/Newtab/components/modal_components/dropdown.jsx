import React, { useContext, useState } from 'react';
import { save } from '../../../../components/Store/Store';
import { TestContext, UserContext } from '../../context';
// import { langsShorhands } from './modal_components/modal_tabs';

const Dropdown = (props) => {
  var [drop, openDropdown] = useState(false);
  const storage = useContext(UserContext);
  const testStorage = useContext(TestContext);
  var el = props.data.indexOf(storage.store.settings[props.setting]);
  var [selected, selectVal] = useState(el === -1 ? 0 : el);
  return (

    <div
      onClick={() => {
        openDropdown(!drop);
      }}
      active={drop ? 'active' : ''}
      className="drop_down cursor-pointer rounded-md relative min-w-[160px] bg-[#464646] text-[#929292] p-2 border border-[#575757] flex flex-col"
    >
      <div className="drop_down_main">{props.data[selected]}</div>
      <div className="drop_down_tringle"></div>
      <div className={'drop_down_options'}>
        {props.data.map((item, i) => {
          if (item === props.data[selected]) {
            return false;
          }
          return (
            <div
              onClick={() => {
                selectVal(i);
                storage.store.settings[props.setting] = props.data[i];
                save(storage.store, storage)
                props.onChange && props.onChange(props.data[i])
              }}
              key={item}
              className={' px-2 py-1 '}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
