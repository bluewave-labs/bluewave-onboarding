import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Switch from "../../Switch/Switch";
import { createLink, updateLink } from "../../../services/linkService";
import s from "./Settings.module.scss";

const Settings = ({ onClose }) => {
  const [state, setState] = useState({
    title: "",
    url: "",
    target: true,
  });

  useEffect(() => {
    const linkSaved = localStorage.getItem("newLink");
    if (linkSaved) {
      const parsedLink = JSON.parse(linkSaved);
      const newState = {
        ...parsedLink,
        target:
          typeof parsedLink.target === "string"
            ? parsedLink.target === "_blank"
            : parsedLink.target,
      };
      setState(newState);
    } else {
      setState({ title: "", url: "", target: true });
    }
  }, []);

  const handleChange = ({ target }) => {
    const { name } = target;
    let { value } = target;
    //if (target.name === "target") value = target.checked;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = async (e) => {
    if (state.id && state.title.trim() && state.url.trim()) {
      await updateLink(state);
      localStorage.removeItem("newLink");
      onClose(e);
    } else if (state.title.trim() && state.url.trim()) {
      await createLink(state);
      localStorage.removeItem("newLink");
      onClose(e);
    } else {
      localStorage.setItem("newLink", JSON.stringify(state));
      onClose(e);
    }
  };

  return (
    <div className={s.settings}>
      <div className={s.settings__header}>
        <span className={s["settings__header--title"]}>Add new link</span>
        <div className={s["settings__header--right"]}>
          <span className={s["settings__header--info"]}>Auto-saved</span>
          <CloseOutlinedIcon
            onClick={handleClose}
            style={{ color: "#98A2B3", fontSize: "20px", cursor: "pointer" }}
          />
        </div>
      </div>
      <div className={s.settings__content}>
        <label htmlFor='title' className={s["settings__content--label"]}>
          <span className={s["settings__content--text"]}>Title</span>
          <input
            className={s["settings__content--input"]}
            id='title'
            type='text'
            name='title'
            onChange={handleChange}
            value={state.title}
          />
        </label>
        <label htmlFor='url' className={s["settings__content--label"]}>
          <span className={s["settings__content--text"]}>
            URL to open (can be a relative URL)
          </span>
          <input
            className={s["settings__content--input"]}
            id='url'
            type='text'
            name='url'
            onChange={handleChange}
            value={state.url}
          />
          <small className={s["settings__content--obs"]}>
            You can use a URL that starts with https:// or an internal address
            that starts with / (slash) character.
          </small>
        </label>

        <label
          htmlFor='switch'
          className={`${s["settings__content--label"]} ${s.last}`}
        >
          <Switch
            id='switch'
            name='target'
            onChange={handleChange}
            value={state.target}
          />
          <span>Open in a new tab</span>
        </label>
      </div>
    </div>
  );
};

Settings.propTypes = {
  onClose: PropTypes.func,
};

export default Settings;
