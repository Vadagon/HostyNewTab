import React, { useState } from 'react';
import Clock from 'react-live-clock';
const ClockBg = (props) => {
  var timezones = [
    {
      name: 'Sydney',
      zone: 'Australia/Sydney',
    },
    {
      name: 'Tokyo',
      zone: 'Asia/Tokyo',
    },
    {
      name: 'Beijing',
      zone: 'Asia/Shanghai',
    },
    {
      name: 'New Delhi',
      zone: 'Asia/Kolkata',
    },
    {
      name: 'Dubai',
      zone: 'Asia/Dubai',
    },
    {
      name: 'Moscow',
      zone: 'Europe/Moscow',
    },
    {
      name: 'Berlin',
      zone: 'Europe/Oslo',
    },
    {
      name: 'London',
      zone: 'GB',
    },
    {
      name: 'New York',
      zone: 'America/New_York',
    },
    {
      name: 'Los Angeles',
      zone: 'America/Los_Angeles',
    },
  ];
  return (
    <div active={props.active ? 'active' : ''} className="clock_bg">
      <div className="main_clock mt-[12%] flex-col flex items-center">
        <Clock format={'HH:mm:ss'} ticking={true} />
        <Clock format={'dddd, D MMMM, y'} ticking={true} />
      </div>

      <div className="fixed flex bottom-5 justify-center w-full p-5">
        {timezones.map((e, i) => {
          return (
            <div key={i} className="flex flex-col mr-5">
              <div className="font-base">{e.name}</div>
              <Clock
                format={'HH:mm / MMMM D'}
                ticking={true}
                timezone={e.zone}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClockBg;
