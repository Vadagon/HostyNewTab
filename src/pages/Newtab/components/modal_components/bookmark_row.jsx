import React from 'react';

const BookmarkRow = (props) => {
  return (
    <div key={props.data.i} className="flex w-full mb-1">
      <label className="checbox_wrapper">
        <a
          target={'_blank'}
          rel="noreferrer"
          className={' text-white flex w-full '}
          href={props.data.e2.url}
          key={'i' + props.data.i}
        >
          <div
            style={{
              backgroundImage:
                'url(http://www.google.com/s2/favicons?domain=' +
                props.data.e2.url +
                ')',
            }}
            className="w-[16px] flex-none h-[16px] bg-[length:16px_16px] bg-no-repeat bg-center mr-2"
          ></div>
          <div className=" overflow-hidden text-ellipsis whitespace-nowrap max-w-[calc(100%-30px)]">
            {props.data.e2.title ? props.data.e2.title : props.data.e2.url}
          </div>
        </a>
        <input
          type="checkbox"
          defaultChecked={props.checked}
          onChange={props.onChange}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default BookmarkRow;
