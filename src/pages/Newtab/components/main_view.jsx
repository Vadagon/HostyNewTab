import React, { useState } from 'react';
import SearchForm from './search_form';
import DraggableItem from './draggable_item';
import Modal from './modal';
const MainView = (props) => {
  var [modal, openModal] = useState(false);
  var bookmarks = [
    {
      title: 'Amazoasdn',
      img: '../../../assets/img/amazon.png',
      url: 'https://www.amazon.com/',
    },
  ];
  return (
    <div>
      <SearchForm />
      {bookmarks.map((item) => (
        <DraggableItem openModal={openModal} {...item} />
      ))}
      <Modal
        title={'Edit Bookmark'}
        open={modal}
        nosidebar
        openModal={openModal}
      >
        <div className="text-white bg-slate-800">settings</div>
      </Modal>
    </div>
  );
};

export default MainView;
