import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useContext, useEffect, useRef, useState } from "react";
import { HelperLinkContext } from "../../../services/linksProvider";
import Switch from "../../Switch/Switch";
import s from "./Settings.module.scss";

const defaultState = {
  title: "",
  url: "",
  target: true,
  helperId: null,
};

const Settings = () => {
  const { toggleSettings, helper, linkToEdit, setLinks, setLinkToEdit } =
    useContext(HelperLinkContext);
  const [oldLink] = useState(linkToEdit);
  const [state, setState] = useState({});
  const settingsRef = useRef();

  const getTarget = (target) => {
    if (typeof target === "boolean") return target;
    return target === "_blank";
  };

  const handleClickOutside = (e) => {
    const isSettings = settingsRef?.current.contains(e.target);
    const isCards = !!(
      settingsRef?.current &&
      settingsRef.current !== e.target &&
      e.target.closest("#cards")
    );
    if (!isSettings && !isCards) {
      handleClose(e);
    }
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
      setState({ ...defaultState, id: Math.floor(Date.now() * Math.random()) });
    }
    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleChange = ({ target }) => {
    const { name } = target;
    let { value } = target;
    if (name === "target") value = target.checked;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = async (e) => {
    e.preventDefault();
    const info = Array.from(
      settingsRef.current.querySelectorAll("input")
    ).reduce(
      (acc, it) => ({
        ...acc,
        [it.name]: it.name === "target" ? state.target : it.value,
      }),
      {}
    );
    if (!info.title.trim() && !info.url.trim()) {
      toggleSettings(e);
      setLinkToEdit(null);
      return;
    }
    if (linkToEdit) {
      setLinks((prev) =>
        prev.map((it) =>
          it.title === oldLink.title && it.id === oldLink.id
            ? { ...info, id: +info.id }
            : it
        )
      );
      setLinkToEdit(null);
      toggleSettings(e);
    } else {
      setLinks((prev) => [...prev, { ...info, id: +info.id }]);
      toggleSettings(e);
    }
  };

  return (
    <form
      className={s.settings}
      ref={settingsRef}
      onSubmit={handleClose}
      role='form'
    >
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
        <input type='hidden' name='id' value={state.id} />
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
      <button type='submit' style={{ display: "none" }}>
        Submit
      </button>
    </form>
  );
};

export default Settings;
