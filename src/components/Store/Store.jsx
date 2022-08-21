import _ from 'lodash/core';

export const initial_store = {
  l10n: {},
  settings: {
    lang: 'uk',
    theme: 'dark',
    search_box: {
      color: '#202124',
      font_color: '#202124',
      icon_color: '#202124',
    },
    time: {
      delay: 20000,
      format: 24,
    },
    background: { custom: null, selected: 0 },
    folders: [
      {
        name: 'Welcome',
        font_color: '#202124',
        preview: null,
        bookmarks: [
          {
            id: 0,
            position: { x: 4, y: 4 },
            name: 'Amazon',
            url: 'https://www.amazon.com/',
            preview: null,
          },
          {
            id: 1,
            position: { x: 5, y: 4 },
            name: null,
            url: null,
            preview: null,
          },
          {
            id: 2,
            position: { x: 6, y: 4 },
            name: null,
            url: null,
            preview: null,
          },
          {
            id: 3,
            position: { x: 7, y: 4 },
            name: null,
            url: null,
            preview: null,
          },
          {
            id: 4,
            position: { x: 8, y: 4 },
            name: null,
            url: null,
            preview: null,
          },
        ],
      },
    ],
    activeFolder: 0,
  },
};

export const save = function (data, storage) {
  // console.log(JSON.stringify(data).length, JSON.stringify(storage.store).length)
  // if (_.isEqual(data, storage.store)) return;
  console.log('saved!');
  const { store, setStore } = storage;
  localStorage.setItem('data', JSON.stringify(data));
  // storage.store.settings.theme
  // store.settings.theme = 'dark'
  setStore && setStore({ ...store, data });
  chrome.storage.local.set({ data: data });
};

export const get = () => {
  var localData = localStorage.getItem('data');
  return localData ? JSON.parse(localData) : initial_store;
  // chrome.storage.sync.get(['data'], function(result) {
  //   return result.data;
  // });
};
