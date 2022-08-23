import React, { useContext, useState } from 'react';
import { i18n } from '../../../components/Translation/Translation';
import { UserContext } from '../context';
import CustomInput from './modal_components/custom_input';
import ModalRowItem from './modal_components/modal_row_item';
import UploadImage from './upload_img';

const ModalEditBookmarks = (props) => {
  const store = useContext(UserContext);

  return (
    <div className="">
      <UploadImage file={props.bookmark?.url} onLoadImage={props.onLoadImage} />
      <ModalRowItem title={i18n('name', store)}>
        <CustomInput
          value={props.bookmark?.name}
          onChange={props.onEditName}
          placeholder={i18n('name', store)}
        />
      </ModalRowItem>
      <ModalRowItem title={i18n('url', store)}>
        <CustomInput
          value={props.bookmark?.url}
          onChange={props.onEditUrl}
          placeholder={i18n('url', store)}
        />
      </ModalRowItem>
    </div>
  );
};

export default ModalEditBookmarks;
