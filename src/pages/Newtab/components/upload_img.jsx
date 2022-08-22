import plus from '../../../assets/img/plus.svg';
import React, { useContext, useRef, useState } from 'react';
import { i18n } from '../../../components/Translation/Translation';
import { UserContext } from '../context';

const UploadImage = (props) => {
  const store = useContext(UserContext);
  var [file, uploadFile] = useState('');
  const ref = useRef(null);
  async function convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  async function handleFileRead(event) {
    const file = event.target.files[0];
    if (file.size > 100000) {
      alert(i18n('less_100', store));
      return;
    }
    const base64 = await convertBase64(file);
    uploadFile(base64);
  }
  function upload() {
    ref.current.click();
  }
  return (
    <div className="flex mb-5 items-center">
      <div
        style={
          file
            ? { backgroundImage: 'url(' + file + ')' }
            : { backgroundImage: 'url(' + plus + ')' }
        }
        active={file ? 'true' : ''}
        onClick={(e) => upload(e)}
        className="bg_upload cursor-pointer bg-no-repeat bg-center   bg-[#464646] border border-[#575757] flex items-center justify-center rounded-full h-[82px] w-[82px]"
      ></div>
      <div className="flex flex-col ml-5">
        <div className="text-white">{i18n('upload_img_text', store)}</div>
        <div
          onClick={(e) => upload(e)}
          className=" bg-[#2abe7d] mt-3 text-white w-max px-3 h-[34px] flex justify-center items-center rounded-md cursor-pointer"
        >
          {i18n('create_preview', store)}
        </div>
      </div>
      <input
        ref={ref}
        type={'file'}
        onChange={(e) => {
          handleFileRead(e);
        }}
        className={'hidden'}
      />
    </div>
  );
};

export default UploadImage;
