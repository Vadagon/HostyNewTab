import plus from '../../../assets/img/plus.svg';
import React, { useContext, useRef, useState } from 'react';
import { i18n } from '../../../components/Translation/Translation';
import { UserContext } from '../context';

const UploadImage = (props) => {
  const store = useContext(UserContext);
  var [file, uploadFile] = useState(null);
  const ref = useRef(null);

  function getBgImg() {
    if (file && props.file) {
      return 'url(' + file + ')';
    }
    if (props.file && !props.folder) {
      return (
        'url(http://www.google.com/s2/favicons?sz=64&domain=' + props.file + ')'
      );
    }
    if (props.folder) {
      return 'url(' + props.file + ')';
    }

    return 'url(' + plus + ')';
  }

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
    props.onLoadImage && props.onLoadImage(base64);
  }
  function upload() {
    ref.current.click();
  }
  return (
    <div className="flex mb-5 items-center">
      <div
        style={{ backgroundImage: getBgImg() }}
        active={file ? 'true' : ''}
        onClick={(e) => upload(e)}
        className="bg_upload cursor-pointer bg-no-repeat bg-center  bg-[#2d2d2d] border border-[#fff] flex items-center justify-center  h-[82px] w-[82px]"
      ></div>
      <div className="flex flex-col ml-5 h-[82px]">
        <div className="text-white">{i18n('upload_img_text', store)}</div>
        <div
          onClick={(e) => upload(e)}
          className=" bg-[#fff] mt-3 text-[#2d2d2d]] w-max px-3 h-[34px] flex justify-center items-center  cursor-pointer"
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
