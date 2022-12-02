import React from 'react';

const Footer = (props) => {
  return (
    <div className="fixed bottom-1 right-0">
      <a href={'https://mainbox.info/privacy/'} rel={'noreferrer'} className="text-[#ffffff8a] mr-3">
        Privacy Policy
      </a>
      <a href={'https://mainbox.info/terms/'} rel={'noreferrer'} className="text-[#ffffff8a] mr-3">
        Terms of Use
      </a>
      <a href={'https://mainbox.info/eula/'} rel={'noreferrer'} className="text-[#ffffff8a] mr-3">
        EULA
      </a>
      <a href={'https://mainbox.info/contact/'} rel={'noreferrer'} className="text-[#ffffff8a] mr-3">
        Contact Us
      </a>
      <a href={'https://mainbox.info/'} rel={'noreferrer'} className="text-[#ffffff8a] mr-3">
        About Us
      </a>
    </div>
  );
};

export default Footer;
