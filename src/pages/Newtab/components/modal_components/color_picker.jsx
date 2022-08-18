import React, { useCallback, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import useClickOutside from '../outsideClick';

export const PopoverPicker = ({ color, onChange }) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="w-[62px] h-[34px]  relative  cursor-pointer ">
      <div
        className="w-[62px] h-[34px]  relative rounded-md cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div
          className="popover absolute z-10 top-[50px] right-[calc(100%-62px)]"
          ref={popover}
        >
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
