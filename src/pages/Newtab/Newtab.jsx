import React, { useState } from 'react';
import './index.scss';
import amazon from '../../assets/img/amazon.png';
import search from '../../assets/img/search.svg';
import Draggable from 'react-draggable';
import Navbar from './components/navbar';
const Newtab = () => {
  return (
    <div className="App">
      <Navbar />
      <Draggable
        axis="none"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        bounds={'body'}
        positionOffset={{ x: '100%', y: '40vh' }}
        // cancel={'.navbar'}
        // onStart={this.handleStart}
        // onDrag={this.handleDrag}
        // onStop={this.handleStop}
      >
        <form
          action="http://www.google.com/search"
          method="get"
          className="flex w-1/3"
        >
          <div
            style={{ backgroundImage: 'url(' + search + ')' }}
            className={
              'rounded-md relative mr-2 w-[60px] bg-[length:24px_24px] bg-[#3D3D3DFF]  p-2 bg-center bg-no-repeat'
            }
          >
            <input
              type={'submit'}
              className={
                ' text-transparent w-full h-full absolute top-0 right-0 cursor-pointer'
              }
              value="search"
            />
          </div>
          <input
            name="q"
            type={'text'}
            placeholder="Search the Web"
            className={
              'rounded-md  w-full text-base h-[60px] text-white p-4 bg-[#3D3D3DFF] opacity-90 flex justify-center items-center flex-col handle hover:opacity-100    transition-all duration-150'
            }
          />
        </form>
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
      <div>
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
    </div>
  );
};

export default Newtab;
