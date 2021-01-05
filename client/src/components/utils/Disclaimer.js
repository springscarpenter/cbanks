import React, { useEffect } from 'react';

const Disclaimer = () => {
  useEffect(() => {
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${window.scrollY}px`;
  }, []);

  return (
    <div className='backdrop' id='disclaimer'>
      <div className='disclaimer-msg'>
        <h3>Risk Disclosure</h3>
        <p>
          Information provided on this site may contain inaccuracies and/or
          discrepancies with real-time data. Use of content is solely at your
          own risk and discretion.
        </p>
        <div className='disclaimer-btn-box'>
          <button
            className='btn'
            onClick={() => {
              document.querySelector('#disclaimer').remove();
              const scrollY = document.body.style.top;
              document.body.style.position = '';
              document.body.style.width = '';
              document.body.style.top = '';
              window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }}
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
