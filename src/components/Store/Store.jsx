import _ from 'lodash/core';

export const initial_store = {
  l10n: {},
  settings: {
    lang: 'en',
    theme: 'dark',
    search_box: {
      color: '#222222',
      font_color: '#ffffff',
      icon_color: '#ffffff',
    },
    time: {
      delay: 20000,
      format: 24,
    },
    background: { custom: null, selected: 0 },
    folders: [
      {
        name: 'Welcome',
        font_color: '#ffffff',
        preview: null,
        index: 1,
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
            name: 'Facebook',
            url: 'https://www.facebook.com/',
            preview: null,
          },
          {
            id: 2,
            position: { x: 6, y: 4 },
            name: 'Google',
            url: 'https://www.google.com/',
            preview: null,
          },
          {
            id: 3,
            position: { x: 7, y: 4 },
            name: 'Stackoverflow',
            url: 'https://stackoverflow.com/',
            preview: null,
          },
          {
            id: 4,
            position: { x: 8, y: 4 },
            name: 'YouTube',
            url: 'https://www.youtube.com/',
            preview: null,
          },
          {
            id: 5,
            position: { x: 4, y: 5 },
            name: 'Pinterest',
            url: 'https://www.pinterest.com/',
            preview: null,
          },
          {
            id: 6,
            position: { x: 5, y: 5 },
            name: 'Reddit',
            url: 'https://www.reddit.com/',
            preview: null,
          },
          {
            id: 7,
            position: { x: 6, y: 5 },
            name: 'Wikipedia',
            url: 'https://www.wikipedia.org/',
            preview: null,
          },
          {
            id: 8,
            position: { x: 7, y: 5 },
            name: 'Netflix',
            url: 'https://www.netflix.com/',
            preview: null,
          },
          {
            id: 9,
            position: { x: 8, y: 5 },
            name: 'Instagram',
            url: 'https://www.instagram.com/',
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
  setStore && setStore({ ...store, ...data });
  // console.log({ ...store, ...data }, data)
  chrome.storage.local.set({ data: data });
};

export const get = () => {
  var localData = localStorage.getItem('data');
  return localData ? JSON.parse(localData) : initial_store;
  // chrome.storage.sync.get(['data'], function(result) {
  //   return result.data;
  // });
};
