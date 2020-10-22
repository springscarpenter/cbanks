import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import Spec from '../components/registry/Spec';

const Registry = () => {
  return (
    <div className='main-content-container'>
      <SwaggerUI spec={Spec} />
    </div>
  );
};

export default Registry;
