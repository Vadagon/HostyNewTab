import React, { useContext } from 'react';
import { i18n } from '../../../../components/Translation/Translation';
import { UserContext } from '../../context';

const ModalControls = (props) => {
  const store = useContext(UserContext);
  return (
    <div className="modal_controls w-[calc(100%-40px)] absolute flex justify-between bottom-5 right-5">
      {props.remove_click ? (
        <div
          onClick={props.remove_click}
          className="mr-5 cursor-pointer  flex items-center justify-center text-white  w-[90px] flex-none   h-[34px]  border border-[#fff]"
        >
          {i18n('remove', store)}
        </div>
      ) : (
        <div>
          {props.settings && (
            <a
              href=""
              className="cursor-pointer  flex items-center justify-center text-white rate-us  bottom-5 bg-yellow-500 h-[34px] w-[90px] "
            >
              {i18n('rate_us', store)}
            </a>
          )}
        </div>
      )}
      {!props.settings && (
        <div className="flex">
          <div
            onClick={() => {
              props.cancel_click(false);
            }}
            className="mr-5 cursor-pointer  flex items-center justify-center text-white  w-[90px] flex-none   h-[34px]  border border-[#fff]"
          >
            {i18n('cancel', store)}
          </div>
          <div
            onClick={props.confirm_click}
            className="cursor-pointer  flex items-center justify-center  w-[90px] flex-none   h-[34px]  bg-white text-[#2d2d2d] "
          >
            {props.confirm_text ? props.confirm_text : i18n('save', store)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalControls;
