import React, { createContext, useState } from 'react';
import './index.scss';

import MainView from './components/main_view';
import { useEffect } from 'react';
import I18n, { getLocalisations } from '../../components/Translation/Translation';
export const UserContext = createContext();

export const initial_store = {
  l10n: {},
  settings: {
    lang: 'uk', theme: 'dark', search_box: {
      color: '#202124', font_color: '#202124', icon_color: '#202124'
    },
    time: {
      delay: 20000, format: 24
    },
    background: { custom: null, selected: 0 },
    folders: [
      {
        name: 'Welcome', font_color: '#202124', preview: null, bookmarks: [
          { position: { x: 4, y: 4 }, name: null, url: null, preview: null },
          { position: { x: 5, y: 4 }, name: null, url: null, preview: null },
          { position: { x: 6, y: 4 }, name: null, url: null, preview: null },
          { position: { x: 7, y: 4 }, name: null, url: null, preview: null },
          { position: { x: 8, y: 4 }, name: null, url: null, preview: null }
        ]
      }
    ]
  }
};
const updated_localisation_store = getLocalisations({ store: initial_store });
const Newtab = () => {
  const [store, setStore] = useState(updated_localisation_store);


  useEffect(() => {
    console.log(store)
    getLocalisations({ store, setStore });
    // chrome.storage.sync.set({key: value}, function() {
    //   console.log('Value is set to ' + value);
    // });

    // chrome.storage.sync.get(['key'], function(result) {
    //   console.log('Value currently is ' + result.key);
    // });
  }, [])

  return (
    < UserContext.Provider value={{ store, setStore }
    }>
      {/* <I18n>general</I18n> */}
      <div className="App">
        <MainView />
      </div>
    </UserContext.Provider >
  );
};

export default Newtab;
