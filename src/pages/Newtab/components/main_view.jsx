import React, { useState } from 'react';
import SearchForm from './search_form';
import DraggableItem from './draggable_item';
const MainView = (props) => {
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
        <DraggableItem {...item} />
      ))}
    </div>
  );
};

export default MainView;
