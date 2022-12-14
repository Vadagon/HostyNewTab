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
      <div
        active={props.children ? 'true' : ''}
        className="modal_content_wrapper"
      >
        <ModalHeader closeModal={props.openModal} title={props.title} />
        <div className="flex h-[calc(100%-60px)]">
          {props.children ? (
            <div className="modal_content w-full  p-5  pb-20">
              {props.children}
            </div>
          ) : (
            <div className="flex h-full w-full">
              {!props.nosidebar && (
                <ModalSidebar
                  settings={props.settings}
                  items={props.sidebar}
                  selectTab={selectTab}
                  selectedTab={selectedTab}
                />
              )}
              <div className="modal_content w-[calc(100%-170px)] p-5 ">
                <ModalTabs
                  selectedBookmarks={props.selectedBookmarks}
                  setSelectedBookmarks={props.setSelectedBookmarks}
                  img={props.img}
                  onLoadImage={props.onLoadImage}
                  color={props.color}
                  setColorFont={props.setColorFont}
                  name={props.name}
                  folderIndex={props.folderIndex}
                  onChange={props.onChange}
                  settings={props.settings}
                  selectedTab={selectedTab}
                  folder={props.folder}
                />
              </div>
            </div>
          )}
        </div>
        <ModalControls
          settings={props.settings}
          remove_click={props.remove_click}
          confirm_text={props.confirm_text}
          cancel_click={props.openModal}
          confirm_click={props.confirm_click}
        />
      </div>
      <ModalOverlay close={props.openModal} open={props.open} />
    </div>
  );
};

export default Modal;
