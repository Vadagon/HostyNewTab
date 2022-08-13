import React, { useState } from 'react';
import './index.scss';
import Draggable from 'react-draggable';
import Navbar from './components/navbar';
const Newtab = () => {
  return (
    <div className="App">
      <Navbar />
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[25, 25]}
        scale={1}
        // cancel={'.navbar'}
        // onStart={this.handleStart}
        // onDrag={this.handleDrag}
        // onStop={this.handleStop}
      >
        <div className="bg-white w-10">
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
    </div>
  );
};

export default Newtab;
