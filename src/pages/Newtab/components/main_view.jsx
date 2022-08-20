import React, { useContext, useState } from 'react';
import GridLayout from './grid_layout';
import Modal from './modal';
import ClockBg from './clock';
import Navbar from './navbar';
import createActivityDetector from 'activity-detector';
import ModalEditBookmarks from './edit_bookmarks_modal';
import { i18n } from '../../../components/Translation/Translation';
import { UserContext } from '../Newtab';

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
const MainView = (props) => {
  const store = useContext(UserContext);
  var [modal, openModal] = useState(false);
  // var [clock, openClock] = useState(false);

  const isIdle = useIdle({ timeToIdle: 5000 });

  return (
    <div>
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
          <ModalEditBookmarks />
        </Modal>
      </div>
      {/* BACKGROUND CLOCK */}
      <ClockBg active={false} />
    </div>
  );
};

export default MainView;
