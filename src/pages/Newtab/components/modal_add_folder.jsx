import React from 'react';
import plus from '../../../assets/img/plus.svg';
import ModalRowItem from './modal_components/modal_row_item';
const ModalAddFolder = (props) => {
  return (
    <div className="">
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
          <div className="text-white">
            Click and create the preview you need
          </div>
          <label
            htmlFor="file"
            className=" bg-[#2abe7d] mt-3 text-white w-[135px] h-[34px] flex justify-center items-center rounded-md cursor-pointer"
          >
            Create Preview
          </label>
        </div>
        <input id="file" type={'file'} className={'hidden'} />
      </div>
      <ModalRowItem title={'Name'}>
        <input
          className="border border-[#575757] h-[34px] w-[250px] py-2 px-3 text-[#929292] bg-[#464646]"
          placeholder="Name"
        />
      </ModalRowItem>
      <ModalRowItem title={'URL'}>
        <input
          className="border border-[#575757] h-[34px] w-[250px] py-2 px-3 text-[#929292] bg-[#464646]"
          placeholder="http://pdr.hsc.gov.ua/test-pdd/uk/"
        />
      </ModalRowItem>
    </div>
  );
};

export default ModalAddFolder;
