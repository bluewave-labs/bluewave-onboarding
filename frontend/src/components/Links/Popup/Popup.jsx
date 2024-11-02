import { Button, Modal } from "@mui/material";
import { useContext } from "react";
import { HelperLinkContext } from "../../../services/linksProvider";
import s from "./Popup.module.scss";

const Popup = () => {
  const {
    isPopupOpen,
    setPopupOpen,
    setLinks,
    itemToDelete,
    links,
    deletedLinks,
    setItemToDelete,
  } = useContext(HelperLinkContext);

  const handleClosePopup = async () => {
    setPopupOpen(false);
    setLinks(links.map((it) => it.id !== itemToDelete.id));
    deletedLinks((prev) => [...prev, itemToDelete]);
    setItemToDelete(null);
  };
  return (
    <Modal
      open={isPopupOpen}
      onClose={() => setPopupOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div className={s.modal}>
        <h2 className={s.modal__title}>Remove this link?</h2>
        <p className={s.modal__desc}>
          Once deleted, this link won’t be visible in the helper.
        </p>
        <div className={s["modal__btn--container"]}>
          <Button
            variant='text'
            style={{
              marginRight: "30px",
              fontSize: "0.813rem",
              lineHeight: "24px",
              color: "#344054",
            }}
            onClick={() => setPopupOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='error'
            disableElevation
            onClick={handleClosePopup}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Popup;