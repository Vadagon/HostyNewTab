import React, { useState } from 'react';
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
import ModalRowItemDropdown from './modal_components/modal_row_item_dropdown';
import ModalHeader from './modal_components/modal_header';
import ModalSidebar from './modal_components/modal_sidebar';
import ModalOverlay from './modal_components/modal_overlay';
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
    <div className={props.open ? 'modal active' : 'modal '}>
      <div className="modal_content_wrapper">
        <ModalHeader openModal={props.openModal} title={props.title} />
        <div className="flex h-full">
          {!props.nosidebar && (
            <ModalSidebar
              items={items}
              selectTab={selectTab}
              selectedTab={selectedTab}
            />
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
                  <ModalRowItemDropdown title={'Default'} img={default_}>
                    <div className=" grid grid-cols-3">
                      <div className="bg-[#343434] h-[80px] cursor-pointer mr-2 mb-2"></div>
                      <div className="bg-[#343434] h-[80px] cursor-pointer mr-2 mb-2"></div>
                      <div className="bg-[#343434] h-[80px] cursor-pointer mr-2 mb-2"></div>
                      <div className="bg-[#343434] h-[80px] cursor-pointer mr-2 mb-2"></div>
                      <div className="bg-[#343434] h-[80px] cursor-pointer mr-2 mb-2"></div>
                      <div className="bg-[#343434] h-[80px] cursor-pointer mr-2 mb-2"></div>
                    </div>
                  </ModalRowItemDropdown>
                  <ModalRowItemDropdown title={'Custom'} img={upload_}>
                    asddsa
                  </ModalRowItemDropdown>
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
              {/* Privacy and Security */}
              {selectedTab === 4 && (
                <div className="tab ">
                  <div className="text-white mb-3">
                    This privacy statement describes how uTab collects and uses
                    the personal information you provide.
                    <a href="#" className="underline ml-1 cursor-pointer">
                      Learn more
                    </a>
                  </div>
                  <div className="text-white mb-3">
                    Terms of use:
                    <a href="#" className="underline ml-1 cursor-pointer">
                      Learn more
                    </a>
                  </div>
                  <div className="text-white mb-3">
                    Contact Us:
                    <a href="#" className="underline ml-1 cursor-pointer">
                      contact@appolo1.com
                    </a>
                    , +442045773098, 7 Bell Yard, WC2A 2JR, London, England
                  </div>
                  <div className="text-white mb-3">
                    <a href="#" className="underline ml-1 cursor-pointer">
                      About Us
                    </a>
                  </div>
                </div>
              )}
            </div>
            {props.children}
          </div>
        </div>
        <div className="modal_controls absolute flex  bottom-5 right-5">
          <div
            onClick={() => {
              props.openModal(false);
            }}
            className="mr-5 cursor-pointer rounded-md flex items-center justify-center text-white  w-[129px] flex-none  bg-[#464646] h-[34px]  border border-[#575757]"
          >
            Cancel
          </div>
          <div
            onClick={() => {
              props.openModal(false);
            }}
            className="cursor-pointer rounded-md flex items-center justify-center text-white  w-[129px] flex-none  bg-[#1493ff] h-[34px] border border-[#575757]"
          >
            Save
          </div>
        </div>
      </div>
      <ModalOverlay openModal={props.openModal} open={props.open} />
    </div>
  );
};

export default Modal;
