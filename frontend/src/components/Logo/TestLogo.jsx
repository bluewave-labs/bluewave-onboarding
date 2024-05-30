import React from 'react';
import Logo from './Logo';

const TestLogo = () => {
  const logo = [];

  return (
    <div>
      <h1>Testing Logo Component</h1>
      <Logo logo={logo} />
    </div>
  );
};

export default TestLogo;
