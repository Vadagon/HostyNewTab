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
    background: { custom: null, selected: 5 },
    folders: [
      {
        name: 'Welcome',
        font_color: '#ffffff',
        preview:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTQwRTgzQUI4QzZDMTFFQUExODNENDBFMzA3NzI1OUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTQwRTgzQUM4QzZDMTFFQUExODNENDBFMzA3NzI1OUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNDBFODNBOThDNkMxMUVBQTE4M0Q0MEUzMDc3MjU5QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNDBFODNBQThDNkMxMUVBQTE4M0Q0MEUzMDc3MjU5QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtT2hcgAAAt2SURBVHja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',
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
