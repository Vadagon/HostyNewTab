import React from 'react';

const ModalControls = (props) => {
  return (
    <div className="modal_controls absolute flex  bottom-5 right-5">
      <div
        onClick={() => {
          props.openModal(false);
        }}
        className="mr-5 cursor-pointer rounded-md flex items-center justify-center text-white  w-[129px] flex-none  bg-[#464646] h-[34px]  border border-[#575757]"
      >
        Cancel
      </div>
      <div
        onClick={() => {
          props.openModal(false);
        }}
        className="cursor-pointer rounded-md flex items-center justify-center text-white  w-[129px] flex-none  bg-[#1493ff] h-[34px] border border-[#575757]"
      >
        Save
      </div>
    </div>
  );
};

export default ModalControls;
