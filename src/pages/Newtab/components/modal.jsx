import React, { useState } from 'react';
import close from '../../../assets/img/close.svg';
import lang from '../../../assets/img/lang.png';
import import_ from '../../../assets/img/import.png';
import export_ from '../../../assets/img/export.png';
import theme from '../../../assets/img/theme.png';
import Dropdown from './dropdown';
var items = [
  'General',
  'Search Box',
  'Background',
  'Time',
  'Privacy and Security',
];
var langs = ['English', 'Deutsch', 'Español', 'Français', 'Русский'];
var mode = ['Dark', 'ligth'];
const Modal = (props) => {
  var [selectedTab, selectTab] = useState(0);
  return (
    <div className={props.open ? 'modal active' : 'modal '}>
      <div className="modal_content_wrapper">
        <div className="modal_header border-b border-[#313131] h-[60px] flex items-center font-base justify-between p-6">
          <div className="font-base">{props.title}</div>
          <div
            style={{ backgroundImage: 'url(' + close + ')' }}
            className="w-[34px] h-[34px] cursor-pointer p-2 bg-[length:14px_14px] bg-no-repeat bg-center"
            onClick={() => {
              props.openModal(false);
            }}
          ></div>
        </div>
        <div className="flex h-full">
          {!props.nosidebar && (
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
                  <div className="flex mb-5 justify-between">
                    <div className="flex items-center">
                      <div
                        style={{ backgroundImage: 'url(' + lang + ')' }}
                        className="w-[12px] h-[12px] mr-3 -mt-1  bg-[length:12px_12px] bg-no-repeat bg-center"
                      ></div>
                      <div className="text-[13px] text-white"> Language</div>
                    </div>
                    <Dropdown data={langs} />
                  </div>
                  <div className="flex mb-5 justify-between">
                    <div className="flex items-center">
                      <div
                        style={{ backgroundImage: 'url(' + theme + ')' }}
                        className="w-[12px] h-[12px] mr-3 -mt-1  bg-[length:12px_12px] bg-no-repeat bg-center"
                      ></div>
                      <div className="text-[13px] text-white"> Theme</div>
                    </div>
                    <Dropdown data={mode} />
                  </div>
                  <div className="flex mb-5 justify-between">
                    <div className="flex items-center">
                      <div
                        style={{ backgroundImage: 'url(' + import_ + ')' }}
                        className="w-[12px] h-[12px] mr-3 -mt-1  bg-[length:12px_12px] bg-no-repeat bg-center"
                      ></div>
                      <div className="text-[13px] text-white">
                        Import Bookmarks
                      </div>
                    </div>
                    <div>
                      <div className="bg-[#2abe7d] text-white w-[135px] h-[34px] flex justify-center items-center rounded-md cursor-pointer">
                        Import
                      </div>
                    </div>
                  </div>

                  <div className="flex mb-5 justify-between">
                    <div className="flex items-center">
                      <div
                        style={{ backgroundImage: 'url(' + import_ + ')' }}
                        className="w-[12px] h-[12px] mr-3 -mt-1  bg-[length:12px_12px] bg-no-repeat bg-center"
                      ></div>
                      <div className="text-[13px] text-white">
                        Export Bookmarks
                      </div>
                    </div>
                    <div>
                      <div className="bg-[#2abe7d] text-white w-[135px] h-[34px] flex justify-center items-center rounded-md cursor-pointer">
                        Export
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {selectedTab === 1 && <div className="tab ">2</div>}
              {selectedTab === 2 && <div className="tab ">3</div>}
              {selectedTab === 3 && <div className="tab ">4</div>}
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
