import React, { useState } from 'react';
const DraggableListItem = (props) => {
  return (
    <li className="bg-[#313131] flex h-full items-center p-4" key={props.index}>
      {`${props.index + 1}.  ${props.item}`}
    </li>
  );
};

export default DraggableListItem;
