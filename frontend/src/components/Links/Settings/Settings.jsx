import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useContext, useEffect, useState } from "react";
import { HelperLinkContext } from "../../../services/linksProvider";
import Switch from "../../Switch/Switch";
import s from "./Settings.module.scss";

const defaultState = {
  title: "",
  url: "",
  target: true,
  helperId: null,
  x: 0,
  y: 0,
};

const Settings = () => {
  const { toggleSettings, helper, linkToEdit, setLinks, setLinkToEdit } =
    useContext(HelperLinkContext);
  const [oldLink] = useState(linkToEdit);
  const [state, setState] = useState(defaultState);

  const getTarget = (target) => {
    if (typeof target === "boolean") return target;
    return target === "_blank";
  };

  useEffect(() => {
    if (linkToEdit) {
      const newState = {
        ...linkToEdit,
        target: getTarget(linkToEdit.target),
        helperId: helper.id,
      };
      setState(newState);
    } else {
      setState(defaultState);
    }
  }, []);

  const handleChange = ({ target }) => {
    const { name } = target;
    let { value } = target;
    if (name === "target") value = target.checked;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = async (e) => {
    if (!state.title.trim() && !state.url.trim()) {
      toggleSettings(e);
      setLinkToEdit(null);
      return;
    }
    if (linkToEdit) {
      setLinks((prev) =>
        prev.map((it) =>
          it.title === oldLink.title && it.url === oldLink.url ? state : it
        )
      );
      setLinkToEdit(null);
      toggleSettings(e);
    } else {
      setLinks((prev) => [...prev, state]);
      toggleSettings(e);
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

export default Settings;
