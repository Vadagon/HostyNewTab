import React, { useContext } from 'react';
import { i18n } from '../../../components/Translation/Translation';
import { UserContext } from '../context';
const SearchForm = (props) => {
  const store = useContext(UserContext);

  return (
    <form action="https://www.bing.com/search" method="get" className="flex  ">
      <div
        style={{
          backgroundColor: store.store.settings['search_box'].color,
        }}
        className={
          ' relative mr-2 w-[60px] p-4  bg-[#3D3D3DFF]  bg-center bg-no-repeat'
        }
      >
        <svg
          data-v-30f7c911=""
          version="1.1"
          viewBox="0 0 129 129"
          svg-inline=""
          role="presentation"
          focusable="false"
        >
          <g data-v-30f7c911="">
            <path
              data-v-30f7c911=""
              fill={store.store.settings['search_box'].icon_color}
              d="M51.6,96.7c11,0,21-3.9,28.8-10.5l35,35c0.8,0.8,1.8,1.2,2.9,1.2s2.1-0.4,2.9-1.2c1.6-1.6,1.6-4.2,0-5.8l-35-35   c6.5-7.8,10.5-17.9,10.5-28.8c0-24.9-20.2-45.1-45.1-45.1C26.8,6.5,6.5,26.8,6.5,51.6C6.5,76.5,26.8,96.7,51.6,96.7z M51.6,14.7   c20.4,0,36.9,16.6,36.9,36.9C88.5,72,72,88.5,51.6,88.5c-20.4,0-36.9-16.6-36.9-36.9C14.7,31.3,31.3,14.7,51.6,14.7z"
            ></path>
          </g>
        </svg>
        <input
          type={'submit'}
          className={
            ' text-transparent w-full h-full absolute top-0 right-0 cursor-pointer'
          }
          value="search"
        />
      </div>
      <input
        name="q"
        type={'text'}
        placeholder={i18n('search_placeholder', store)}
        style={{
          '--placeholder-color': store.store.settings['search_box'].font_color,
          backgroundColor: store.store.settings['search_box'].color,
          color: store.store.settings['search_box'].font_color,
        }}
        className={
          'custom_placeholder   w-full text-base h-[60px]  p-4 bg-[#222] text-white  transition-all duration-150'
        }
      />
    </form>
  );
};

export default SearchForm;
