import React from 'react';
import search from '../../../assets/img/search.svg';
const SearchForm = (props) => {
  return (
    <form
      action="http://www.google.com/search"
      method="get"
      className="flex w-1/3 fixed left-1/2 top-1/3 -translate-x-1/2 z-10"
    >
      <div
        style={{ backgroundImage: 'url(' + search + ')' }}
        className={
          'rounded-md relative mr-2 w-[60px] bg-[length:24px_24px] bg-[#3D3D3DFF]  p-2 bg-center bg-no-repeat'
        }
      >
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
        placeholder="Search the Web..."
        className={
          'rounded-md  w-full text-base h-[60px]  p-4 bg-[#3D3D3DFF] text-[#1deee2] placeholder:text-white transition-all duration-150'
        }
      />
    </form>
  );
};

export default SearchForm;
