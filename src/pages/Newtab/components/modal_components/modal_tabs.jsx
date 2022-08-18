import React, { useState } from 'react';
import import_ from '../../../../assets/img/import.png';
import lang from '../../../../assets/img/lang.png';
import plus from '../../../../assets/img/plus.svg';
import Dropdown from '../dropdown';
import ModalRowItem from './modal_row_item';
import ModalRowItemDropdown from './modal_row_item_dropdown';
import upload_ from '../../../../assets/img/upload.png';
import default_ from '../../../../assets/img/default.png';
import clock_ from '../../../../assets/img/clock.png';
import time_format from '../../../../assets/img/time-forma.png';
import font_color from '../../../../assets/img/font-color.png';
import icon_color from '../../../../assets/img/icon-color.png';
import search_bar_color from '../../../../assets/img/search-bar-color.png';
import export_ from '../../../../assets/img/export.png';
import theme from '../../../../assets/img/theme.png';
import { PopoverPicker } from './color_picker';
var langs = ['English', 'Deutsch', 'Español', 'Français', 'Русский'];
var time = ['20 sec', '30 sec', '40 sec', '1 min', 'Disable Time'];
var time_format_ = ['24-based Hour', '12-based Hour'];
var mode = ['Dark', 'Ligth'];
const ModalTabs = (props) => {
  const [color, setColor] = useState('#aabbcc');
  const [colorFont, setColorFont] = useState('#aabbcc');
  const [colorIcon, setColorIcon] = useState('#aabbcc');
  if (props.settings) {
    return (
      <div className="tabs">
        {/* General */}
        {props.selectedTab === 0 && (
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
        {props.selectedTab === 1 && (
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
        {props.selectedTab === 2 && (
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
        {props.selectedTab === 3 && (
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
        {props.selectedTab === 4 && (
          <div className="tab ">
            <div className="text-white mb-3">
              This privacy statement describes how uTab collects and uses the
              personal information you provide.
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
    );
  } else {
    return (
      <div>
        {props.selectedTab === 0 && (
          <div className="tab ">
            <div className="flex mb-5 items-center">
              <label
                htmlFor="file"
                className="cursor-pointer bg-[#464646] border border-[#575757] flex items-center justify-center rounded-full h-[82px] w-[82px]"
              >
                <div
                  style={{ backgroundImage: 'url(' + plus + ')' }}
                  className="w-[24px] h-[24px] bg-[length:24px_24px] bg-no-repeat bg-center"
                ></div>
              </label>
              <div className="flex flex-col ml-5">
                <div className="text-white">JPG or PNG</div>
                <label
                  htmlFor="file"
                  className=" bg-[#2abe7d] mt-3 text-white w-[135px] h-[34px] flex justify-center items-center rounded-md cursor-pointer"
                >
                  Upload Preview
                </label>
              </div>
              <input id="file" type={'file'} className={'hidden'} />
            </div>

            <ModalRowItem title={'Folder Name'}>
              <input
                className="border border-[#575757] h-[34px] w-[250px] py-2 px-3 text-[#929292] bg-[#464646]"
                placeholder="Name"
              />
            </ModalRowItem>
            <ModalRowItem title={'Font Color'}>
              <PopoverPicker color={colorFont} onChange={setColorFont} />
            </ModalRowItem>
          </div>
        )}
        {props.selectedTab === 1 && <div className="tab ">bookmarks</div>}
      </div>
    );
  }
};

export default ModalTabs;
