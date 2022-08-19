import React, { useState } from 'react';
import SearchForm from './search_form';
import DraggableItem from './draggable_item';
import Modal from './modal';
import plus from '../../../assets/img/plus.svg';
import ClockBg from './clock';
import Navbar from './navbar';
import createActivityDetector from 'activity-detector';
import ModalRowItem from './modal_components/modal_row_item';

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
          remove_click={() => {
            console.log('remove bookmark');
          }}
          confirm_click={() => {
            console.log('edit bookmark');
          }}
        >
          <div className="">
            <div className="flex mb-5 items-center">
              <label
                htmlFor="file"
                className="cursor-pointer bg-[#464646] border border-[#575757] flex items-center justify-center rounded-full h-[82px] w-[82px]"
              >
                <div
                  style={{ backgroundImage: 'url(' + plus + ')' }}
                  className="w-[24px] h-[24px] bg-[length:24px_24px] bg-no-repeat bg-center"
                ></div>
              </label>
              <div className="flex flex-col ml-5">
                <div className="text-white">
                  Click and create the preview you need
                </div>
                <label
                  htmlFor="file"
                  className=" bg-[#2abe7d] mt-3 text-white w-[135px] h-[34px] flex justify-center items-center rounded-md cursor-pointer"
                >
                  Create Preview
                </label>
              </div>
              <input id="file" type={'file'} className={'hidden'} />
            </div>
            <ModalRowItem title={'Name'}>
              <input
                className="border border-[#575757] h-[34px] w-[250px] py-2 px-3 text-[#929292] bg-[#464646]"
                placeholder="Name"
              />
            </ModalRowItem>
            <ModalRowItem title={'URL'}>
              <input
                className="border border-[#575757] h-[34px] w-[250px] py-2 px-3 text-[#929292] bg-[#464646]"
                placeholder="http://pdr.hsc.gov.ua/test-pdd/uk/"
              />
            </ModalRowItem>
          </div>
        </Modal>
      </div>
      {/* BACKGROUND CLOCK */}
      <ClockBg active={false} />
    </div>
  );
};

export default MainView;
