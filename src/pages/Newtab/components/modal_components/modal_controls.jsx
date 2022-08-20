import React, { useContext } from 'react';
import { i18n } from '../../../../components/Translation/Translation';
import { UserContext } from '../../Newtab';

const ModalControls = (props) => {
  const store = useContext(UserContext);
  return (
    <div className="modal_controls w-[calc(100%-40px)] absolute flex justify-between bottom-5 right-5">
      {props.remove_click ? (
        <div
          onClick={() => {
            props.remove_click(false);
          }}
          className="mr-5 cursor-pointer rounded-md flex items-center justify-center text-white  w-[90px] flex-none  bg-[#464646] h-[34px]  border border-[#575757]"
        >
          {i18n('remove', store)}
        </div>
      ) : (
        <div>
          {props.settings && (
            <a
              href=""
              className="cursor-pointer rounded-md flex items-center justify-center text-white rate-us  bottom-5 bg-yellow-500 h-[34px] w-[90px] "
            >
              {i18n('rate_us', store)}
            </a>
          )}
        </div>
      )}
      <div className="flex">
        <div
          onClick={() => {
            props.cancel_click(false);
          }}
          className="mr-5 cursor-pointer rounded-md flex items-center justify-center text-white  w-[90px] flex-none  bg-[#464646] h-[34px]  border border-[#575757]"
        >
          {i18n('cancel', store)}
        </div>
        <div
          onClick={() => {
            props.confirm_click(false);
          }}
          className="cursor-pointer rounded-md flex items-center justify-center text-white  w-[90px] flex-none  bg-[#1493ff] h-[34px] border border-[#575757]"
        >
          {props.confirm_text ? props.confirm_text : i18n('save', store)}
        </div>
      </div>
    </div>
  );
};

export default ModalControls;
