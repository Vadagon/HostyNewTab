import React, { useContext, useEffect, useRef, useState } from 'react';
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
import font_color from '../../../../assets/img/font-color.png';
import icon_color from '../../../../assets/img/icon-color.png';
import search_bar_color from '../../../../assets/img/search-bar-color.png';
import { PopoverPicker } from './color_picker';
import UploadImage from '../upload_img';
import {
  i18n,
  langsShorhands,
} from '../../../../components/Translation/Translation';
import { UserContext } from '../../context';
import { save } from '../../../../components/Store/Store';
import BookmarkRow from './bookmark_row';

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

const ModalTabs = (props) => {
  const refUpload = useRef(null);
  const store = useContext(UserContext);
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
    store.store.settings['background'].custom = base64;
    save(store.store, store);
    // file
  }

  useEffect(() => {
    chrome.bookmarks.getTree().then((e) => {
      bookmarks = e[0].children;
    });
  }, []);
  const [color, setColor] = useState(store.store.settings['search_box'].color);
  const [colorFont, setColorFont] = useState(
    store.store.settings['search_box'].font_color
  );
  const [colorIcon, setColorIcon] = useState(
    store.store.settings['search_box'].icon_color
  );
  var [search, setSearch] = useState('');
  const [selected, selectBg] = useState(5);
  // var time_format_ = [i18n('based_hour24', store), i18n('based_hour12', store)];
  // var time = [
  //   i18n('sec20', store),
  //   i18n('sec30', store),
  //   i18n('sec40', store),
  //   i18n('min1', store),
  //   i18n('disable_time', store),
  // ];
  // var mode = [i18n('dark', store), i18n('light', store)];
  if (props.settings) {
    return (
      <div className="tabs">
        {/* General */}
        {props.selectedTab === 0 && (
          <div className="tab ">
            <ModalRowItem title={i18n('language', store)} img={lang}>
              <Dropdown
                data={langsShorhands}
                setting={'lang'}
                onChange={(lang) => {
                  // window.location.reload()
                }}
              />
            </ModalRowItem>
            {/* <ModalRowItem title={i18n('theme', store)} img={theme}>
              <Dropdown data={mode} setting={'theme'} />
            </ModalRowItem> */}
            {/* <ModalRowItem title={i18n('import_bookmarks', store)} img={import_}>
              <div className="bg-[#2abe7d] text-white w-[135px] h-[34px] flex justify-center items-center rounded-md cursor-pointer">
                {i18n('import', store)}
              </div>
            </ModalRowItem>
            <ModalRowItem title={i18n('export_bookmarks', store)} img={export_}>
              <div className="bg-[#2abe7d] text-white w-[135px] h-[34px] flex justify-center items-center rounded-md cursor-pointer">
                {i18n('export', store)}
              </div>
            </ModalRowItem> */}
          </div>
        )}
        {/* Search Box */}
        {props.selectedTab === 1 && (
          <div className="tab ">
            <ModalRowItem title={'Color'} img={search_bar_color}>
              <PopoverPicker
                color={color}
                onChange={(e) => {
                  store.store.settings['search_box'].color = e;
                  // save(store.store, store);
                  console.log(store);
                  setColor(e);
                }}
              />
            </ModalRowItem>
            <ModalRowItem title={'Font Color'} img={font_color}>
              <PopoverPicker
                color={colorFont}
                onChange={(e) => {
                  store.store.settings['search_box'].font_color = e;
                  save(store.store, store);
                  console.log(store);
                  setColorFont(e);
                }}
              />
            </ModalRowItem>
            <ModalRowItem title={'Icon Color'} img={icon_color}>
              <PopoverPicker
                onChange={(e) => {
                  store.store.settings['search_box'].icon_color = e;
                  save(store.store, store);
                  console.log(store);
                  setColorIcon(e);
                }}
                color={colorIcon}
              />
            </ModalRowItem>
          </div>
        )}
        {/* Background */}
        {props.selectedTab === 2 && (
          <div className="tab ">
            <ModalRowItemDropdown
              open
              title={i18n('default', store)}
              img={default_}
            >
              <div className=" grid grid-cols-3">
                <div
                  active={
                    0 === store.store.settings['background'].selected
                      ? 'true'
                      : ''
                  }
                  onClick={() => {
                    store.store.settings['background'].custom = null;
                    store.store.settings['background'].selected = 0;
                    save(store.store, store);
                    selectBg(0);
                  }}
                  className="bgs bg-[#343434] relative h-[80px] cursor-pointer mr-2 mb-2"
                ></div>
                {bg.map((x, i) => (
                  <div
                    active={
                      i === store.store.settings['background'].selected - 1
                        ? 'true'
                        : ''
                    }
                    onClick={() => {
                      store.store.settings['background'].custom = null;
                      store.store.settings['background'].selected = i + 1;
                      save(store.store, store);
                      selectBg(i + 1);
                      console.log(store.store.settings['background']);
                    }}
                    key={i}
                    style={{ backgroundImage: 'url(' + x + ')' }}
                    className="bgs bg-[#343434] relative  bg-cover bg-no-repeat bg-center h-[80px] cursor-pointer mr-2 mb-2"
                  ></div>
                ))}
              </div>
            </ModalRowItemDropdown>
            <ModalRowItemDropdown title={i18n('custom', store)} img={upload_}>
              <ModalRowItem title={'JPG / PNG'}>
                <label className="bg-[#2abe7d] text-white px-3 h-[34px] flex justify-center items-center rounded-md cursor-pointer">
                  {i18n('upload_image', store)}
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
                    ref={refUpload}
                    onChange={(e) => { }}
                    className="border border-[#575757] h-[34px]  py-2 px-3 text-[#929292] bg-[#464646]"
                    placeholder={i18n('add_image_url', store)}
                  />
                  <div
                    onClick={() => {
                      store.store.settings['background'].custom =
                        refUpload.current.value;
                      save(store.store, store);
                      console.log(store.store.settings['background']);
                      selectBg(0);
                    }}
                    className="bg-[#2abe7d] rounded-l-none text-white px-3 h-[34px] flex justify-center items-center rounded-md cursor-pointer"
                  >
                    {i18n('load', store)}
                  </div>
                </div>
              </ModalRowItem>
            </ModalRowItemDropdown>
          </div>
        )}
        {/* Time */}
        {/* {props.selectedTab === 3 && (
          <div className="tab ">
            <ModalRowItem title={i18n('delay', store)} img={clock_}>
              <Dropdown data={time} />
            </ModalRowItem>
            <ModalRowItem title={i18n('time_format', store)} img={time_format}>
              <Dropdown data={time_format_} />
            </ModalRowItem>
          </div>
        )} */}
        {/* Privacy and Security */}
        {props.selectedTab === 3 && (
          <div className="tab ">
            <div className="text-white mb-3">
              This privacy statement describes how uTab collects and uses the
              personal information you provide.
              <a href="#" className="underline ml-1 cursor-pointer">
                {i18n('learn_more', store)}
              </a>
            </div>
            <div className="text-white mb-3">
              Terms of use:
              <a href="#" className="underline ml-1 cursor-pointer">
                {i18n('learn_more', store)}
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
                {i18n('about_us', store)}
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
            <UploadImage
              file={props.img}
              folder={props.folder}
              onLoadImage={props.onLoadImage}
            />

            <ModalRowItem title={i18n('folder_name', store)}>
              <input
                className="border border-[#575757] h-[34px] w-[250px] py-2 px-3 text-[#929292] bg-[#464646]"
                placeholder={i18n('name', store)}
                defaultValue={props.name}
                onChange={props.onChange}
              />
            </ModalRowItem>
            <ModalRowItem title={i18n('font_color', store)}>
              <PopoverPicker
                color={props.color}
                onChange={props.setColorFont}
              />
            </ModalRowItem>
          </div>
        )}
        {props.selectedTab === 1 && (
          <div className="tab ">
            <input
              className="border border-[#575757] h-[34px] mb-5 w-full py-2 px-3 text-[#929292] bg-[#464646]"
              placeholder={i18n('search_bookmark', store)}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                console.log(e.target.value);
              }}
            />
            <div>
              {bookmarks.map((e, i) => {
                if (search)
                  return (
                    <div>
                      {getBookmarksArr(e).map((e2, i) => {
                        var checked = false;
                        console.log(props.folderIndex)
                        var _localBookmarks = props.folderIndex != null ? store.store.settings.folders[
                          props.folderIndex
                        ].bookmarks || [] : [];
                        [..._localBookmarks, ...props.selectedBookmarks].forEach((bookmarkLocal) => {
                          if (bookmarkLocal.url === e2.url) {
                            checked = true;
                            console.log(bookmarkLocal, props.name)
                          }
                        });
                        if (
                          e2.title
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          e2.url.toLowerCase().includes(search.toLowerCase())
                        )
                          return (
                            <BookmarkRow
                              key={i + 's' + props.folderIndex + '-' + Math.random()}
                              checked={checked}
                              onChange={(e) => {
                                props.setSelectedBookmarks({ e2, e, i });
                                console.log(props.selectedBookmarks);
                              }}
                              data={{ e2, i }}
                            />
                          );
                      })}
                    </div>
                  );
                if (e.children.length === 0) return <div key={i}></div>;
                return (
                  <ModalRowItemDropdown key={i} title={e.title}>
                    <div className="flex w-full flex-col">
                      <div>
                        {getBookmarksArr(e).map((e2, i) => {
                          var checked = false;
                          var _localBookmarks = props.folderIndex != null ? store.store.settings.folders[
                            props.folderIndex
                          ].bookmarks || [] : [];
                          [..._localBookmarks, ...props.selectedBookmarks].forEach((bookmarkLocal) => {
                            if (bookmarkLocal.url === e2.url) {
                              checked = true;
                            }
                          });
                          return (
                            <BookmarkRow
                              checked={checked}
                              key={i + 's' + props.folderIndex + '-' + Math.random()}
                              onChange={(e) => {
                                console.log({ e2, e, i })
                                props.setSelectedBookmarks({ e2, e, i });
                              }}
                              data={{ e2, i }}
                            />
                          );
                        })}
                      </div>
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
