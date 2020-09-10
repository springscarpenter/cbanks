import React from 'react';

const Disclaimer = () => {
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
            onClick={() => document.querySelector('#disclaimer').remove()}
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
