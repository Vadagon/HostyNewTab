import React, { useContext } from 'react';

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import RGL, { WidthProvider } from 'react-grid-layout';
import SearchForm from './search_form';
import ReactGridLayoutItem from './react_grid_layout_item';
import { save } from '../../../components/Store/Store';
import { UserContext } from '../context';
import _ from 'lodash';
const ReactGridLayout = WidthProvider(RGL);
const GridLayout = (props) => {
  const { store, setStore } = useContext(UserContext);
  var layout = [{ i: 'searchBar', x: 4, y: 3, w: 5, h: 1, static: true }];
  var storeClone = _.cloneDeep(store);
  var activeFolder =
    storeClone.settings.folders[store.settings.activeFolder ?? 0];
  activeFolder.bookmarks.forEach((bookmark, bookmarkId) => {
    layout.push({
      i: 'custom-' + bookmarkId + '-' + bookmark.name,
      x: bookmark.position.x ?? 0,
      y: bookmark.position.y ?? 0,
      w: 1,
      h: 1,
    });
  });
  // store.settings.folders.forEach((folder) => {
  //   folder.bookmarks.forEach((bookmark, bookmarkId) =>
  //     layout.push({
  //       i: 'custom_bookmark-' + bookmark.id,
  //       x: bookmark.position.x,
  //       y: bookmark.position.y,
  //       w: 1,
  //       h: 1,
  //       title: bookmark.name,
  //     })
  //   );
  // });
  for (let x = 0; x < 13; x++) {
    layout.push({ i: 'astatic' + x, x: x, y: 8, w: 1, h: 2, static: true });
  }
  function renderSwitch(e) {
    if (e.i.includes('astatic')) {
      return <div></div>;
    }
    switch (e.i) {
      case 'searchBar':
        return <SearchForm />;

      default:
        return (
          <ReactGridLayoutItem
            editBookmark={props.editBookmark}
            openModal={props.openModal}
            title={e.title}
            bookmarkId={parseInt(e.i.split('-')[1])}
          />
        );
    }
  }
  return (
    <div>
      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={13}
        rowHeight={(window.innerHeight - 40) / 8}
        isBounded={true}
        verticalCompact={false}
        preventCollision={true}
        isResizable={false}
        margin={[0, 0]}
        onLayoutChange={(layout, layouts) => {
          var d = layout.map(function (e) {
            if (e.i.includes('custom-')) {
              var sss = parseInt(e.i.split('-')[1]);
              activeFolder.bookmarks.map(function (bookmark) {
                if (bookmark.id === sss)
                  bookmark.position = {
                    x: e.x,
                    y: e.y,
                  };
                return e;
              });
              !_.isEqual(storeClone, store) &&
                save(storeClone, { store, setStore });
              // console.log(storeClone.settings.folders[0].bookmarks, store.settings.folders[0].bookmarks);
              return e;
            } else {
              return null;
            }
          });
        }}
      >
        {layout.map((e) => (
          <div key={e.i}>{renderSwitch(e)}</div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default GridLayout;
