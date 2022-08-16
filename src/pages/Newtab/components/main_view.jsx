import React, { useState } from 'react';
import close from '../../../assets/img/close.svg';
import amazon from '../../../assets/img/amazon.png';
import search from '../../../assets/img/search.svg';
import Draggable from 'react-draggable';
import SearchForm from './search_form';
const MainView = (props) => {
  return (
    <div>
      <SearchForm />

      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[50, 50]}
        scale={1}
        bounds={'body'}
      >
        <div className="rounded-md p-2 w-[80px] cursor-pointer flex justify-center items-center flex-col handle hover:bg-black hover:bg-opacity-40  duration-150">
          <div
            className="rounded-full w-[64px] bg-cover bg-center bg-no-repeat h-[64px] "
            style={{ backgroundImage: 'url(' + amazon + ')' }}
          ></div>
          <div className="text-white text-sm">Amazon</div>
        </div>
      </Draggable>

      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[50, 50]}
        scale={1}
        bounds={'body'}
      >
        <div className="rounded-md p-2 w-[80px] cursor-pointer flex justify-center items-center flex-col handle hover:bg-black hover:bg-opacity-40  duration-150">
          <div
            className="rounded-full w-[64px] bg-cover bg-center bg-no-repeat h-[64px] "
            style={{ backgroundImage: 'url(' + amazon + ')' }}
          ></div>
          <div className="text-white text-sm">Amazon</div>
        </div>
      </Draggable>
    </div>
  );
};

export default MainView;
