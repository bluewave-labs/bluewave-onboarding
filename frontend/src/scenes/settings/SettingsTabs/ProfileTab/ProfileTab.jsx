import React from "react";
import Avatar from "../../../../components/Avatar/Avatar";
import styles from "./ProfileTab.module.css";
import CustomTextField from "../../../../components/TextFieldComponents/CustomTextField/CustomTextField";
import Button from "../../../../components/Button/Button";

const ProfileTab = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className={styles.form}>
        <div className={styles.formElements}>
          <label htmlFor="first-name" className={styles.label}>
            First Name
          </label>
          <CustomTextField
            type="text"
            name="first-name"
            id="first-name"
            placeholder="Enter your first name"
            required
            style={{ flexGrow: 1, textAlign: 'right' }}
            TextFieldWidth="350px"
          />
        </div>
        <div className={styles.formElements}>
          <label htmlFor="last-name" className={styles.label}>
            Last Name
          </label>
          <CustomTextField
            type="text"
            name="last-name"
            id="last-name"
            placeholder="Enter your last name"
            required
            style={{ flexGrow: 1, textAlign: 'right' }}
            TextFieldWidth="350px"
          />
        </div>
        <div className={styles.formElements}>
          <div className={styles.labelElements}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <p className={styles.supportText}>
              This is your current email address -- it cannot be changed.
            </p>
          </div>
          <CustomTextField
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            disabled // Disabled since it cannot be changed
            style={{ flexGrow: 1, textAlign: 'right' }}
            TextFieldWidth="350px"
          />
        </div>
        <div className={styles.photoElements}>
          <div>
            <label htmlFor="photo" className={styles.label}>
              Your Photo
            </label>
            <div className={styles.photoAlign}>
              <p className={styles.supportText}>
                This photo will be displayed on your profile page.
              </p>
              <div className={styles.photoOptions}>
                <Avatar src="/vendetta.png" alt="User" size="large"/>
                <div>
                  <button className={styles.delete}>Delete</button>
                  <button className={styles.update}>Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.saveButton}>
          <Button
            text="Save"
            onClick={submitHandler}
            style={{ width: '120px', marginTop: '40px' }}
          />
        </div>
      </form>
      <div>
        <h4 className={styles.label}>Delete Account</h4>
        <p className={styles.supportText}>
          Note that deleting your account will remove all data from our system. This is permanent and non-recoverable.
        </p>
        <Button text="Delete Account" buttonType="error" style={{ padding: '6px  20px', marginTop: '35px' }} />
      </div>
    </>
  );
};

export default ProfileTab;
