import React, { useContext, useState } from 'react';
import { save } from '../../../../components/Store/Store';
import { TestContext, UserContext } from '../../context';
// import { langsShorhands } from './modal_components/modal_tabs';

const Dropdown = (props) => {
  var langs = {
    en: 'English',
    de: 'Deutsch',
    es: 'Español',
    fr: 'Français',
    ru: 'Русский',
    uk: 'Укрїнська',
  };
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
      className="drop_down cursor-pointer relative min-w-[160px] bg-[#2d2d2d] text-[#929292] p-2 border border-[#fff] flex flex-col"
    >
      <div className="drop_down_main">{langs[props.data[selected]]}</div>
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
                save(storage.store, storage);
                props.onChange && props.onChange(props.data[i]);
              }}
              key={item}
              className={' px-2 py-1 '}
            >
              {langs[item]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
