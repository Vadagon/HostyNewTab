import React from 'react';
import './index.scss';

import MainView from './components/main_view';
import { useEffect } from 'react';
const Newtab = () => {

  useEffect(() => {
    console.log(chrome.i18n.getMessage('general'));
    // chrome.storage.sync.set({key: value}, function() {
    //   console.log('Value is set to ' + value);
    // });

    // chrome.storage.sync.get(['key'], function(result) {
    //   console.log('Value currently is ' + result.key);
    // });
  }, [])

  return (
    <div className="App">
      <MainView />
    </div>
  );
};

export default Newtab;
