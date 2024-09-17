import React from "react";
import { LuAlertTriangle } from "react-icons/lu";
import "./PasswordTab.css";

const PasswordTab = () => {
  return (
    <div>
      <form className="form">
        <div className="current-password-element">
          <label htmlFor="current-password" className="label">
            Current Password
          </label>
          <input
            type="text"
            name="current-password"
            id="current-password"
            className="input"
          />
        </div>
        <div className="form-elements">
          <label htmlFor="new-password" className="label">
            Password
          </label>
          <input
            type="text"
            name="new-password"
            id="new-password"
            className="input"
          />
        </div>
        <div className="form-elements">
          <label htmlFor="confirm-password" className="label">
            Confirm new password
          </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            className="input"
          />
        </div>
        <div className="alert">
            <p className="alert-message">
                <span><LuAlertTriangle /></span>
                New password must contain at least 8 characters and must have at least one uppercase letter, one number and one symbol.
            </p>
        </div>
        <div className="save-button">
            <button className="save">Save</button>
          </div>
      </form>
    </div>
  );
};

export default PasswordTab;
