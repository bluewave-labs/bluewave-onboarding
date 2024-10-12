import React, { useState } from "react";
import Avatar from "../../../components/Avatar/Avatar";
import styles from "./ProfileTab.module.css";
import CustomTextField from "../../../components/TextFieldComponents/CustomTextField/CustomTextField";
import Button from "../../../components/Button/Button";
import { useAuth } from "../../../services/authProvider";
import DeleteConfirmationModal from "../../../components/Modals/DeleteConfirmationModal/DeleteConfirmationModal";
import UploadModal from "../../../components/Modals/UploadImageModal/UploadModal";

const ProfileTab = () => {

  const { userInfo } = useAuth();

  const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
  const [openUploadImageModal, setOpenUploadImageModal] = useState(false);

  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUploadImageModalClose = () => {
    setOpenUploadImageModal(false);
  }

  const handleDeleteAccountModalClose = () => {
    setOpenDeleteAccountModal(false);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.formElements}>
          <label htmlFor="first-name" className={styles.label}>
            First Name
          </label>
          <CustomTextField
            type="text"
            name="name"
            id="first-name"
            placeholder="Enter your first name"
            value={userInfo.name}
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
            name="surname"
            id="last-name"
            placeholder="Enter your last name"
            value={userInfo.surname}
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
            value={userInfo.email}
            disabled={true} // Disabled since it cannot be changed
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
                <Avatar src="/vendetta.png" alt="User" size="large" />
                <div>
                  <button className={styles.delete}>Delete</button>
                  <button onClick={() => setOpenUploadImageModal(!openUploadImageModal)} className={styles.update}>Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.saveButton}>
          <Button
            text="Save"
            type="submit"
            style={{ width: '120px', marginTop: '40px' }}
          />
        </div>
      </form>
      <div>
        <h4 className={styles.label}>Delete Account</h4>
        <p className={styles.supportText}>
          Note that deleting your account will remove all data from our system. This is permanent and non-recoverable.
        </p>
        <Button onClick={() => setOpenDeleteAccountModal(!openDeleteAccountModal)} text="Delete Account" buttonType="error" style={{ padding: '6px  20px', marginTop: '35px' }} />
      </div>
      <DeleteConfirmationModal open={openDeleteAccountModal} handleClose={handleDeleteAccountModalClose} />
      <UploadModal
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
        open={openUploadImageModal}
        handleClose={handleUploadImageModalClose}
      />
    </>
  );
};

export default ProfileTab;
