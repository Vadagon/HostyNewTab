import React, { useState } from 'react';

import ModalHeader from './modal_components/modal_header';
import ModalSidebar from './modal_components/modal_sidebar';
import ModalOverlay from './modal_components/modal_overlay';
import ModalControls from './modal_components/modal_controls';
import ModalTabs from './modal_components/modal_tabs';

const Modal = (props) => {
  var [selectedTab, selectTab] = useState(0);

  return (
    <div className={props.open ? 'modal active' : 'modal '}>
      <div className="modal_content_wrapper">
        <ModalHeader openModal={props.openModal} title={props.title} />
        <div className="flex h-full">
          {!props.nosidebar && (
            <ModalSidebar
              settings={props.settings}
              items={props.sidebar}
              selectTab={selectTab}
              selectedTab={selectedTab}
            />
          )}
          <div className="modal_content p-5 w-full">
            <ModalTabs settings={props.settings} selectedTab={selectedTab} />
          </div>
        </div>
        <ModalControls openModal={props.openModal} />
      </div>
      <ModalOverlay openModal={props.openModal} open={props.open} />
    </div>
  );
};

export default Modal;
