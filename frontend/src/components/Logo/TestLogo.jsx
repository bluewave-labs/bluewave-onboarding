import React from 'react';
import Logo from './Logo';
import LogoBW from './../../assets/logo/introflow_logo_bw.svg';

const TestLogo = () => {
  const logo = [];

  return (
    <div>
      <h1>Testing Logo Component</h1>
      <img src={LogoBW}/>
    </div>
  );
};

export default TestLogo;
