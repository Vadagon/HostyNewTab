import React, { useContext } from 'react';
import { i18n } from '../../../components/Translation/Translation';
import { UserContext } from '../context';
import ModalRowItem from './modal_components/modal_row_item';
import UploadImage from './upload_img';

const ModalEditBookmarks = (props) => {
  const store = useContext(UserContext);
  return (
    <div className="">
      <UploadImage />
      <ModalRowItem title={i18n('name', store)}>
        <input
          className="border border-[#575757] h-[34px] w-[250px] py-2 px-3 text-[#929292] bg-[#464646]"
          placeholder={i18n('name', store)}
        />
      </ModalRowItem>
      <ModalRowItem title={i18n('url', store)}>
        <input
          className="border border-[#575757] h-[34px] w-[250px] py-2 px-3 text-[#929292] bg-[#464646]"
          placeholder="http://pdr.hsc.gov.ua/test-pdd/uk/"
        />
      </ModalRowItem>
    </div>
  );
};

export default ModalEditBookmarks;
