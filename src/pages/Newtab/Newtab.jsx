import React, { createContext, useState } from 'react';
import './index.scss';

import MainView from './components/main_view';
import { useEffect } from 'react';
import I18n, { getLocalisations } from '../../components/Translation/Translation';
import { get } from '../../components/Store/Store';
export const UserContext = createContext();

const updated_localisation_store = getLocalisations({ store: get() });
const Newtab = () => {
  const [store, setStore] = useState(updated_localisation_store);

  useEffect(() => {
    console.log(store);
    getLocalisations({ store, setStore });
    // chrome.storage.sync.set({key: value}, function() {
    //   console.log('Value is set to ' + value);
    // });

    // chrome.storage.sync.get(['key'], function(result) {
    //   console.log('Value currently is ' + result.key);
    // });
  }, []);

  return (
    <UserContext.Provider value={{ store, setStore }}>
      {/* <I18n>general</I18n> */}
      <div className="App">
        <MainView />
      </div>
    </UserContext.Provider>
  );
};

export default Newtab;
