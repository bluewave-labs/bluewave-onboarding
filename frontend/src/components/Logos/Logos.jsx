import React from 'react';

const Logos=() => {
    return (
        <div className="logos-container">
          <div className="logos-title">Logos</div>
          <div className="logos-box">
            <div className="logo-item">
              <OnboardLogo />
              <div className="logo-label">BlueWave Onboard logo</div>
            </div>
            <div className="logo-item">
              <HRLogo />
              <div className="logo-label">BlueWave HR logo</div>
            </div>
          </div>
        </div>
      );
    };
    
    export default Logos;