import React from "react";
import Avatar from "../../../../components/Avatar/Avatar";
import "./ProfileTab.css";

const ProfileTab = () => {
  return (
    <div>
      <div>
        <form className="form">
          <div className="first-name-element">
            <label htmlFor="first-name" className="label">
              First Name
            </label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              className="input"
            />
          </div>
          <div className="form-elements">
            <label htmlFor="last-name" className="label">
              Last Name
            </label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              className="input"
            />
          </div>
          <div className="form-elements">
            <div className="label-elements">
              <label htmlFor="email" className="label">
                Email
              </label>
              <p className="support-text">
                This is your current email address -- it cannot be changed.
              </p>
            </div>
            <input type="email" name="email" id="email" className="input" />
          </div>
          <div className="photo-elements">
            <div>
              <label htmlFor="photo" className="label">
                Your Photo
              </label>
              <p className="support-text">
                This photo will be displayed in your profile page.
              </p>
            </div>
            <div className="photo-options">
              <Avatar src="/vendetta.png" alt="User" size="large"/>
              <div className="button-options">
                <p>Delete</p>
                <button className="update">Update</button>
              </div>
            </div>
          </div>
          <div className="save-button">
            <button className="save">Save</button>
          </div>
        </form>
        <div>
            <div>
                <h4 className="delete-heading">Delete Account</h4>
                <p className="support-text">Note that deleting your account will remove all data from our system. This is permanent and non-recoverable.</p>
            </div>
            <button className="delete">Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
