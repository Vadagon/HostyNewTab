import React from 'react';
import './index.scss';

import MainView from './components/main_view';
import { ProviderContext } from './context';

const Newtab = () => {
  return (
    <ProviderContext>
      {/* <I18n>general</I18n> */}
      <div className={'App'}>
        <MainView />
      </div>
    </ProviderContext>
  );
};

export default Newtab;
