import React, { useEffect, useState } from 'react';
import import_ from '../../../../assets/img/import.png';
import lang from '../../../../assets/img/lang.png';
import amazon from '../../../../assets/img/amazon.png';
import Dropdown from './dropdown';
import ModalRowItem from './modal_row_item';
import ModalRowItemDropdown from './modal_row_item_dropdown';
import upload_ from '../../../../assets/img/upload.png';
import default_ from '../../../../assets/img/default.png';
import bg_1 from '../../../../assets/img/custom_bg/bg_1.jpg';
import bg_2 from '../../../../assets/img/custom_bg/bg_2.jpg';
import bg_3 from '../../../../assets/img/custom_bg/bg_3.jpg';
import bg_4 from '../../../../assets/img/custom_bg/bg_4.jpg';
import bg_5 from '../../../../assets/img/custom_bg/bg_5.jpg';
import clock_ from '../../../../assets/img/clock.png';
import time_format from '../../../../assets/img/time-forma.png';
import font_color from '../../../../assets/img/font-color.png';
import icon_color from '../../../../assets/img/icon-color.png';
import search_bar_color from '../../../../assets/img/search-bar-color.png';
import export_ from '../../../../assets/img/export.png';
import theme from '../../../../assets/img/theme.png';
import { PopoverPicker } from './color_picker';
import UploadImage from '../upload_img';
import { langsShorhands } from '../../../../components/Translation/Translation';
var langs = ['English', 'Deutsch', 'Español', 'Français', 'Русский', 'Укрїнська'];
var time = ['20 sec', '30 sec', '40 sec', '1 min', 'Disable Time'];
var time_format_ = ['24-based Hour', '12-based Hour'];
var mode = ['dark', 'light'];
var bg = [bg_1, bg_2, bg_3, bg_4, bg_5];
var bookmarks = {};

function getBookmarksArr(e) {
  var arr = [];
  e.children.map(function (e, i) {
    if (e.hasOwnProperty('children')) {
      arr.push(...getBookmarksArr(e));
    } else {
      arr.push(e);
    }
    return e;
  });
  return arr;
}
function getChildrens(e, i) {
  return (
    <div>
      {getBookmarksArr(e).map((e2, i) => {
        return (
          <div key={i} className="flex w-full mb-1">
            <label className="checbox_wrapper">
              <a
                target={'_blank'}
                rel="noreferrer"
                className={' text-white flex w-full '}
                href={e2.url}
                key={'i' + i}
              >
                <div
                  style={{
                    backgroundImage: 'url(http://www.google.com/s2/favicons?domain=' + e2.url + ')',
                  }}
                  className="w-[16px] flex-none h-[16px] bg-[length:16px_16px] bg-no-repeat bg-center mr-2"
                ></div>
                <div className=" overflow-hidden text-ellipsis whitespace-nowrap max-w-[calc(100%-30px)]">
                  {e2.title ? e2.title : e2.url}
                </div>
              </a>
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
const ModalTabs = (props) => {
  var [file, uploadFile] = useState('');
  async function convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  async function handleFileRead(event) {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    uploadFile(base64);
    console.log(base64);
    // file
  }

  useEffect(() => {
    chrome.bookmarks.getTree().then((e) => {
      bookmarks = e[0].children;
    });
  }, []);
  const [color, setColor] = useState('#aabbcc');
  const [colorFont, setColorFont] = useState('#ffffff');
  const [colorIcon, setColorIcon] = useState('#aabbcc');
  const [selected, selectBg] = useState(5);

  if (props.settings) {
    return (
      <div className="tabs">
        {/* General */}
        {props.selectedTab === 0 && (
          <div className="tab ">
            <ModalRowItem title={'Language'} img={lang}>
              <Dropdown data={langsShorhands} setting={'lang'} onChange={(lang) => {
                // window.location.reload()
              }} />
            </ModalRowItem>
            <ModalRowItem title={'Theme'} img={theme}>
              <Dropdown data={mode} setting={'theme'} />
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
                <div
                  active={selected === 0 ? 'true' : ''}
                  onClick={() => selectBg(0)}
                  className="bgs bg-[#343434] relative h-[80px] cursor-pointer mr-2 mb-2"
                ></div>
                {bg.map((x, i) => (
                  <div
                    active={selected === i + 1 ? 'true' : ''}
                    onClick={() => selectBg(i + 1)}
                    key={i}
                    style={{ backgroundImage: 'url(' + x + ')' }}
                    className="bgs bg-[#343434] relative  bg-cover bg-no-repeat bg-center h-[80px] cursor-pointer mr-2 mb-2"
                  ></div>
                ))}
              </div>
            </ModalRowItemDropdown>
            <ModalRowItemDropdown title={'Custom'} img={upload_}>
              <ModalRowItem title={'JPG / PNG'}>
                <label className="bg-[#2abe7d] text-white w-[135px] h-[34px] flex justify-center items-center rounded-md cursor-pointer">
                  Upload Image
                  <input
                    onChange={(e) => {
                      handleFileRead(e);
                    }}
                    type={'file'}
                    className={'hidden'}
                  />
                </label>
              </ModalRowItem>
              <ModalRowItem title={'JPG / PNG / GIF'}>
                <div className="flex">
                  <input
                    className="border border-[#575757] h-[34px] w-[150px] py-2 px-3 text-[#929292] bg-[#464646]"
                    placeholder="Add image Url and click load"
                  />
                  <div className="bg-[#2abe7d] rounded-l-none text-white w-[50px] h-[34px] flex justify-center items-center rounded-md cursor-pointer">
                    Load
                  </div>
                </div>
              </ModalRowItem>
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
      <div className="flex h-[calc(100%-60px)] overflow-hidden overflow-y-auto w-full flex-col">
        {props.selectedTab === 0 && (
          <div className="tab ">
            <UploadImage />

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
        {props.selectedTab === 1 && (
          <div className="tab ">
            <input
              className="border border-[#575757] h-[34px] mb-5 w-full py-2 px-3 text-[#929292] bg-[#464646]"
              placeholder="Search bookmark"
            />
            <div>
              {bookmarks.map((e, i) => {
                if (e.children.length === 0) return <div key={i}></div>;
                return (
                  <ModalRowItemDropdown key={i} title={e.title}>
                    <div className="flex w-full flex-col">
                      {getChildrens(e, i)}
                    </div>
                  </ModalRowItemDropdown>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default ModalTabs;
