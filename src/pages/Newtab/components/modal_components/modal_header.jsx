import React from 'react';
import close_ from '../../../../assets/img/close.svg';

const ModalHeader = (props) => {
  return (
    <div className="modal_header border-b border-[#313131] h-[60px] flex items-center font-base justify-between p-6">
      <div className="font-base">{props.title}</div>
      <div
        style={{ backgroundImage: 'url(' + close_ + ')' }}
        className="w-[34px] h-[34px] cursor-pointer p-2 bg-[length:14px_14px] bg-no-repeat bg-center"
        onClick={() => {
          props.closeModal(false);
        }}
      ></div>
    </div>
  );
};

export default ModalHeader;
