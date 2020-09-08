import React from 'react';

const Disclaimer = () => {
  return (
    <div className='backdrop' id='disclaimer'>
      <div className='disclaimer-msg'>
        <p>
          Disclaimer: Information provided on this site may contain inaccuracies
          and/or discrepancies with real-time data. Use of content is solely at
          your own risk and discretion.
        </p>
        <button
          className='btn disclaimer-btn'
          onClick={() => document.querySelector('#disclaimer').remove()}
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

export default Disclaimer;
