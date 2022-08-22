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
const MainView = (props) => {
  const store = useContext(UserContext);
  var [modal, openModal] = useState(false);
  // var [clock, openClock] = useState(false);

  const isIdle = useIdle({ timeToIdle: 5000 });
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
          false
            ? 'opacity-0 duration-500 transition-all'
            : 'opacity-100 transition-all duration-500'
        }
      >
        <Navbar />

        <GridLayout openModal={openModal} />
        <Modal
          title={i18n('edit_bookmarks', store)}
          open={modal}
          nosidebar
          openModal={openModal}
          remove_click={() => {
            console.log('remove bookmark');
          }}
          confirm_click={() => {
            console.log('edit bookmark');
          }}
        >
          <ModalEditBookmarks
            onLoadImage={(e) => {
              console.log(e);
            }}
          />
        </Modal>
      </div>
      {/* BACKGROUND CLOCK */}
      <ClockBg active={false} />
    </div>
  );
};

export default MainView;
