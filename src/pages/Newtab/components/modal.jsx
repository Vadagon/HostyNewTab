import React, { useState } from 'react';
import close_ from '../../../assets/img/close.svg';
import lang from '../../../assets/img/lang.png';
import import_ from '../../../assets/img/import.png';
import upload_ from '../../../assets/img/upload.png';
import default_ from '../../../assets/img/default.png';
import clock_ from '../../../assets/img/clock.png';
import time_format from '../../../assets/img/time-forma.png';
import font_color from '../../../assets/img/font-color.png';
import icon_color from '../../../assets/img/icon-color.png';
import search_bar_color from '../../../assets/img/search-bar-color.png';
import export_ from '../../../assets/img/export.png';
import theme from '../../../assets/img/theme.png';
import Dropdown from './dropdown';
import ModalRowItem from './modal_components/modal_row_item';
import { PopoverPicker } from './color_picker';
var items = [
  'General',
  'Search Box',
  'Background',
  'Time',
  'Privacy and Security',
];
var time = ['20 sec', '30 sec', '40 sec', '1 min', 'Disable Time'];
var time_format_ = ['24-based Hour', '12-based Hour'];
var langs = ['English', 'Deutsch', 'Español', 'Français', 'Русский'];
var mode = ['Dark', 'Ligth'];
const Modal = (props) => {
  var [selectedTab, selectTab] = useState(0);
  const [color, setColor] = useState('#aabbcc');
  const [colorFont, setColorFont] = useState('#aabbcc');
  const [colorIcon, setColorIcon] = useState('#aabbcc');
  return (
    <div className={props.open ? 'modal active' : 'modal active'}>
      <div className="modal_content_wrapper">
        <div className="modal_header border-b border-[#313131] h-[60px] flex items-center font-base justify-between p-6">
          <div className="font-base">{props.title}</div>
          <div
            style={{ backgroundImage: 'url(' + close_ + ')' }}
            className="w-[34px] h-[34px] cursor-pointer p-2 bg-[length:14px_14px] bg-no-repeat bg-center"
            onClick={() => {
              props.openModal(false);
            }}
          ></div>
        </div>
        <div className="flex h-full">
          {props.nosidebar && (
            <div className="modal_sidebar pt-5 w-[170px] flex flex-col flex-none border-[#313131] border-r">
              {items.map((item, i) => (
                <div
                  onClick={() => {
                    selectTab(i);
                  }}
                  key={i}
                  className="pl-5 py-[9px] mb-3 text-[13px] pr-3 cursor-pointer text-white"
                >
                  {item}
                </div>
              ))}
              <div className="rate-us">Rate Us</div>
            </div>
          )}
          <div className="modal_content p-5 w-full">
            <div className="tabs">
              {/* General */}
              {selectedTab === 0 && (
                <div className="tab ">
                  <ModalRowItem title={'Language'} img={lang}>
                    <Dropdown data={langs} />
                  </ModalRowItem>
                  <ModalRowItem title={'Theme'} img={theme}>
                    <Dropdown data={mode} />
                  </ModalRowItem>
                  <ModalRowItem title={'Import Bookmarks'} img={import_}>
                    <div className="bg-[#2abe7d] text-white w-[135px] h-[34px] flex justify-center items-center rounded-md cursor-pointer">
                      Import
                    </div>
                  </ModalRowItem>
                  <ModalRowItem title={'Export Bookmarks'} img={export_}>
                    <div className="bg-[#2abe7d] text-white w-[135px] h-[34px] flex justify-center items-center rounded-md cursor-pointer">
                      Export
                    </div>
                  </ModalRowItem>
                </div>
              )}
              {/* Search Box */}
              {selectedTab === 1 && (
                <div className="tab ">
                  <ModalRowItem title={'Color'} img={search_bar_color}>
                    <PopoverPicker color={color} onChange={setColor} />
                  </ModalRowItem>
                  <ModalRowItem title={'Font Color'} img={font_color}>
                    <PopoverPicker color={colorFont} onChange={setColorFont} />
                  </ModalRowItem>
                  <ModalRowItem title={'Icon Color'} img={icon_color}>
                    <PopoverPicker color={colorIcon} onChange={setColorIcon} />
                  </ModalRowItem>
                </div>
              )}
              {/* Background */}
              {selectedTab === 2 && (
                <div className="tab ">
                  <ModalRowItem title={'Default'} img={default_}>
                    <PopoverPicker color={color} onChange={setColor} />
                  </ModalRowItem>
                  <ModalRowItem title={'Custom'} img={upload_}>
                    <PopoverPicker color={color} onChange={setColor} />
                  </ModalRowItem>
                </div>
              )}
              {/* Time */}
              {selectedTab === 3 && (
                <div className="tab ">
                  <ModalRowItem title={'Delay'} img={clock_}>
                    <Dropdown data={time} />
                  </ModalRowItem>
                  <ModalRowItem title={'Time Format'} img={time_format}>
                    <Dropdown data={time_format_} />
                  </ModalRowItem>
                </div>
              )}
              {selectedTab === 4 && <div className="tab ">5</div>}
              {selectedTab === 5 && <div className="tab ">6</div>}
            </div>
            {props.children}
          </div>
        </div>
        <div className="modal_controls absolute bottom-0">asddsadsa</div>
      </div>
      <div
        onClick={() => {
          props.openModal(false);
        }}
        className={props.open ? 'modal_overlay active' : 'modal_overlay'}
      ></div>
    </div>
  );
};

export default Modal;
