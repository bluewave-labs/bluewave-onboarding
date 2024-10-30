import { Button, Modal } from "@mui/material";
import PropTypes from "prop-types";
import { deleteLink, getLinks } from "../../../services/linkService";
import s from "./Popup.module.scss";

const Popup = ({
  isPopupOpen,
  setPopupOpen,
  setItems,
  itemToDelete,
  helperId,
}) => {
  const renderLinks = () =>
    getLinks(helperId).then((data) => {
      setItems(
        data
          .map((it) => ({ ...it, x: 0, y: 0 }))
          .sort((a, b) => a.order - b.order)
      );
    });

  const handleClosePopup = async () => {
    setPopupOpen(false);
    const deleted = await deleteLink(itemToDelete);
    if (deleted) {
      renderLinks();
    }
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

Popup.propTypes = {
  isPopupOpen: PropTypes.bool,
  setPopupOpen: PropTypes.func,
  setItems: PropTypes.func,
  itemToDelete: PropTypes.number,
  helperId: PropTypes.number,
};

export default Popup;
