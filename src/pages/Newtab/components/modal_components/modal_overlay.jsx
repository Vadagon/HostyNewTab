import React from 'react';

const ModalOverlay = (props) => {
  return (
    <div
      onClick={() => {
        props.close(false);
      }}
      className={props.open ? 'modal_overlay active' : 'modal_overlay'}
    ></div>
  );
};

export default ModalOverlay;
