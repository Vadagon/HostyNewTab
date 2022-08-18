import React, { useState } from 'react';
import SearchForm from './search_form';
import DraggableItem from './draggable_item';
import Modal from './modal';
import ClockBg from './clock';
import Navbar from './navbar';
import createActivityDetector from 'activity-detector';
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
  var [modal, openModal] = useState(false);
  // var [clock, openClock] = useState(false);
  var bookmarks = [
    {
      title: 'Amazoasdn',
      img: '../../../assets/img/amazon.png',
      url: 'https://www.amazon.com/',
    },
  ];
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
        <SearchForm />
        {bookmarks.map((item, i) => (
          <DraggableItem key={i} openModal={openModal} {...item} />
        ))}
        <Modal
          title={'Edit Bookmark'}
          open={modal}
          nosidebar
          openModal={openModal}
        ></Modal>
      </div>
      {/* BACKGROUND CLOCK */}
      <ClockBg active={false} />
    </div>
  );
};

export default MainView;
