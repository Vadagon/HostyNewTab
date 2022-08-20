import React, { useContext } from 'react';
import search from '../../../assets/img/search.svg';
import { i18n } from '../../../components/Translation/Translation';
import { UserContext } from '../context';
const SearchForm = (props) => {
  const store = useContext(UserContext);
  return (
    <form action="http://www.google.com/search" method="get" className="flex  ">
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
        placeholder={i18n('search_placeholder', store)}
        className={
          'rounded-md  w-full text-base h-[60px]  p-4 bg-[#3D3D3DFF] text-white placeholder:text-gray-300 transition-all duration-150'
        }
      />
    </form>
  );
};

export default SearchForm;
