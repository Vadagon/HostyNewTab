import React, { useState } from 'react';
import close from '../../../assets/img/close.svg';

const Modal = (props) => {
  return (
    <div className={props.open ? 'modal active' : 'modal'}>
      <div className="modal_content_wrapper">
        <div className="modal_header h-[60px] flex items-center font-base justify-between p-6">
          <div className="font-base">Settings</div>
          <div
            style={{ backgroundImage: 'url(' + close + ')' }}
            className="w-[34px] h-[34px] cursor-pointer p-2 bg-[length:14px_14px] bg-no-repeat bg-center"
            onClick={() => {
              props.openModal(false);
            }}
          ></div>
        </div>
        <div className="flex">
          <div className="modal_sidebar">
            <div className="">General</div>
            <div className="">Search Box</div>
            <div className="">Background</div>
            <div className="">Sidebar</div>
            <div className="">Time</div>
            <div className="">Privacy and Security</div>
          </div>
          <div className="modal_content">{props.children}</div>
        </div>
        <div className="modal_controls absolute bottom-0">asddsadsa</div>
      </div>
      <div
        onClick={() => {
          props.openModal(false);
        }}
        className={props.open ? 'modal_overlay active' : 'modal_overlay'}
      ></div>
    </div>
  );
};

export default Modal;
