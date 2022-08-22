import React, { useContext } from 'react';
import edit from '../../../assets/img/edit.svg';
import { UserContext } from '../context';
const ReactGridLayoutItem = (props) => {
  var storage = useContext(UserContext);
  // console.log(props.bookmarkId);
  // console.log(storage.store.settings.folders[0].bookmarks);
  var bookmark =
    storage.store.settings.folders[storage.store.settings.activeFolder]
      .bookmarks[props.bookmarkId];
  function getBgImg() {
    if (bookmark.preview) {
      return 'url(' + bookmark.preview + ')';
    }
    if (bookmark.url) {
      return (
        'url(http://www.google.com/s2/favicons?sz=64&domain=' +
        bookmark.url +
        ')'
      );
    }
    return 'url(data:image/png;base64,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)';
  }
  return (
    <div className="h-full flex w-full">
      <div className="drag_item handle rounded-md p-2 h-full  w-full cursor-pointer flex  items-center flex-col relative hover:bg-black hover:bg-opacity-40  duration-150">
        <div
          style={{ backgroundImage: 'url(' + edit + ')' }}
          onClick={() => {
            props.openModal(true);
          }}
          className="edit_on_hover  w-[24px] bg-[length:14px_14px]  bg-center bg-no-repeat h-[24px] bg-black bg-opacity-40 rounded-full -top-3 -right-3 cursor-pointer delay-200 transition-all duration-150 flex opacity-0 pointer-events-none absolute justify-center items-center p-1 "
        ></div>
        <div className="w-full flex justify-center min-h-[64px]">
          <a
            cover={bookmark.preview ? 'true' : ''}
            target={'_blank'}
            rel={'noreferrer'}
            href={bookmark.url}
            className="    rounded-md bg-center w-full h-full max-w-[64px] bg-no-repeat  "
            style={{
              backgroundImage: getBgImg(),
            }}
          >
            {''}
          </a>
        </div>
        <a
          target={'_blank'}
          rel={'noreferrer'}
          href={bookmark.url}
          style={{
            color:
              storage.store.settings.folders[
                storage.store.settings.activeFolder
              ].font_color,
          }}
          className="text-white text-sm mt-[10%]  text-center text-ellipsis whitespace-nowrap overflow-hidden w-full"
        >
          {bookmark.name}
        </a>
      </div>
    </div>
  );
};

export default ReactGridLayoutItem;
