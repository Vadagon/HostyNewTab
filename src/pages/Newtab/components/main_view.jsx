import React, { useContext, useState } from 'react';
import GridLayout from './grid_layout';
import Modal from './modal';
import ClockBg from './clock';
import Navbar from './navbar';
import createActivityDetector from 'activity-detector';
import ModalEditBookmarks from './edit_bookmarks_modal';
import { UserContext } from '../context';
import { i18n } from '../../../components/Translation/Translation';
import bg_1 from '../../../assets/img/custom_bg/bg_1.jpg';
import bg_2 from '../../../assets/img/custom_bg/bg_2.jpg';
import bg_3 from '../../../assets/img/custom_bg/bg_3.jpg';
import bg_4 from '../../../assets/img/custom_bg/bg_4.jpg';
import bg_5 from '../../../assets/img/custom_bg/bg_5.jpg';
import { save } from '../../../components/Store/Store';
import _ from 'lodash';
import Footer from './footer';
function useIdle(options) {
  const [isIdle, setIsIdle] = React.useState(false);
  React.useEffect(() => {
    const activityDetector = createActivityDetector(options);
    activityDetector.on('idle', () => setIsIdle(true));
    activityDetector.on('active', () => setIsIdle(false));
    return () => activityDetector.stop();
  }, []);
  return isIdle;
}
var bg = [bg_1, bg_2, bg_3, bg_4, bg_5];
const MainView = () => {
  const store = useContext(UserContext);
  var [modal, openModal] = useState(false);
  var [index, editModal] = useState(false);
  const [bookmarkState, setBookmarkState] = useState(
    store.store.settings.folders[store.store.settings.activeFolder].bookmarks[0]
  );

  const handleChange = (obj) => {
    setBookmarkState((bookmarkState) => ({
      ...bookmarkState,
      ...obj,
    }));
  };
  const isIdle = useIdle({ timeToIdle: 15000 });
  function getBgImage() {
    if (store.store.settings['background'].custom) {
      return store.store.settings['background'].custom;
    }
    if (store.store.settings['background'].selected === 0) {
      return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    }
    return bg[store.store.settings['background'].selected - 1];
  }
  return (
    <div
      style={{
        backgroundImage: 'url(' + getBgImage() + ')',
      }}
      className="p-5 pl-[70px] bg-[#343434] bg-fixed  bg-cover bg-no-repeat bg-center    h-[100vh]"
    >
      <div
        className={
          isIdle
            ? 'opacity-0 duration-500 transition-all'
            : 'opacity-100 transition-all duration-500'
        }
      >
        <Navbar />

        <GridLayout
          editBookmark={(index) => {
            var bookmark = null;
            store.store.settings.folders[
              store.store.settings.activeFolder
            ].bookmarks.forEach((e) => {
              if (e.id === index) {
                bookmark = e;
              }
            });
            editModal(bookmark.id);

            setBookmarkState(bookmark);
          }}
          openModal={openModal}
        />
        <Modal
          title={i18n('edit_bookmarks', store)}
          open={modal}
          nosidebar
          openModal={openModal}
          remove_click={() => {
            var storeClone = _.cloneDeep(store.store);
            storeClone.settings.folders[
              store.store.settings.activeFolder
            ].bookmarks.splice(index, 1);
            console.log(storeClone);
            // arr.splice(index, 1);
            // console.log(arr);
            save(storeClone, store);
            console.log('save');
            openModal(false);
            // if (index2 > -1) { // only splice array when item is found
            //   array.splice(index, 1); // 2nd parameter means remove one item only
            // }
          }}
          confirm_click={() => {
            // var bookmark = null
            store.store.settings.folders[
              store.store.settings.activeFolder
            ].bookmarks = store.store.settings.folders[
              store.store.settings.activeFolder
            ].bookmarks.map(function (e) {
              if (e.id === index) {
                return bookmarkState;
              }
              return e;
            });
            // bookmark = bookmarkState;
            save(store.store, store);
            openModal(false);
          }}
        >
          <ModalEditBookmarks
            bookmark={bookmarkState}
            onEditName={(e) => {
              handleChange({ name: e.target.value });
            }}
            onEditUrl={(e) => {
              handleChange({ url: e.target.value });
            }}
            onLoadImage={(e) => {
              handleChange({ preview: e });
            }}
          />
        </Modal>
      </div>
      {/* BACKGROUND CLOCK */}
      <ClockBg active={isIdle} />
      <Footer />
    </div>
  );
};

export default MainView;
