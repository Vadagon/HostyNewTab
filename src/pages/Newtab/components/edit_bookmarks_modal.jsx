import React from 'react';
import ModalRowItem from './modal_components/modal_row_item';
import UploadImage from './upload_img';

const ModalEditBookmarks = (props) => {
  return (
    <div className="">
      <UploadImage />
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

export default ModalEditBookmarks;
