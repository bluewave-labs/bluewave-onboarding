import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Button from "../../Button/Button";
import CustomTextField from "../../TextFieldComponents/CustomTextField/CustomTextField";

const LinkDialog = ({
  open,
  handleClose = () => {},
  url = "",
  setUrl = () => {},
  isLinkActive = false,
  handleInsertLink = () => {},
  handleOpenLink = () => {},
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isLinkActive ? "Edit Link" : "Add Link"}</DialogTitle>
      <DialogContent>
        <CustomTextField
          type="url"
          placeholder="https://"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        {isLinkActive && (
          <Button
            text="Open Link"
            buttonType="secondary"
            variant="text"
            onClick={handleOpenLink}
          />
        )}
        <Button
          text={url ? "Insert/Update" : "Remove Link"}
          onClick={handleInsertLink}
        />
        <Button
          text="Cancel"
          buttonType="secondary"
          variant="text"
          onClick={handleClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default LinkDialog;
