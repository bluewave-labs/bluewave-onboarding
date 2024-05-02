import React from 'react';
import onboardLogo from //need to add the path
import hrLogo from //need to add the path

function Logos() {
    return(
        <div className="logos">
            <div className="logo-item">
                <img src={onboardLogo} alt="BlueWave Onboard Logo" />
                <p>BlueWave Onboard logo</p>
            </div>
            <div classname="logo-item">
                <img src={hrLogo} alt="BlueWave HR Logo" />
                <p>BlueWave HR logo</p>
                </div>
        </div>
    );
}
export default Logos;