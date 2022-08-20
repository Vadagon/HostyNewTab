import React, { createContext, useState } from 'react';
import './index.scss';

import MainView from './components/main_view';
import { useEffect } from 'react';
import I18n, { getLocalisations } from '../../components/Translation/Translation';
export const UserContext = createContext();

export const initial_store = { l10n: {}, settings: { lang: 'uk' } };
const l10n = getLocalisations({ store: initial_store });
const Newtab = () => {
  const [store, setStore] = useState({ l10n: l10n, settings: { lang: 'uk' } });


  useEffect(() => {
    getLocalisations({ store, setStore });
    // chrome.storage.sync.set({key: value}, function() {
    //   console.log('Value is set to ' + value);
    // });

    // chrome.storage.sync.get(['key'], function(result) {
    //   console.log('Value currently is ' + result.key);
    // });
  }, [])

  console.log(l10n, store);
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
