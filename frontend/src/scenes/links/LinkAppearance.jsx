import { useContext } from "react";
import { HelperLinkContext } from "../../services/linksProvider";
import s from "./LinkPage.module.scss";

const LinkAppearance = () => {
  const { helper, setHelper } = useContext(HelperLinkContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHelper((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className={s.appearance} role="form">
      <label htmlFor='header' className={s.appearance__label}>
        Header text{" "}
        <input
          type='text'
          id='header'
          className={s.appearance__input}
          name='title'
          value={helper.title}
          onChange={handleChange}
        />
      </label>
      <label htmlFor='header-bg' className={s.appearance__label}>
        Header background color{" "}
        <div className={s.appearance__color}>
          <span className={`${s.appearance__input} ${s.header}`}>
            {helper.headerBackgroundColor}
          </span>
          <div className={s.appearance__circle}>
            <input
              type='color'
              id='header-bg'
              name='headerBackgroundColor'
              value={helper.headerBackgroundColor}
              onChange={handleChange}
            />
            <span
              className={s["appearance__circle--mask"]}
              style={{ backgroundColor: helper.headerBackgroundColor }}
            />
          </div>
        </div>
      </label>
      <label htmlFor='link-color' className={s.appearance__label}>
        Link font color{" "}
        <div className={s.appearance__color}>
          <span className={`${s.appearance__input} ${s.link}`}>
            {helper.linkFontColor}
          </span>
          <div className={s.appearance__circle}>
            <input
              type='color'
              id='link-color'
              name='linkFontColor'
              value={helper.linkFontColor}
              onChange={handleChange}
            />
            <span
              className={s["appearance__circle--mask"]}
              style={{ backgroundColor: helper.linkFontColor }}
            />
          </div>
        </div>
      </label>
      <label htmlFor='icon' className={s.appearance__label}>
        Helper icon color{" "}
        <div className={s.appearance__color}>
          <span className={`${s.appearance__input} ${s.icon}`}>
            {helper.iconColor}
          </span>
          <div className={s.appearance__circle}>
            <input
              type='color'
              id='icon'
              name='iconColor'
              value={helper.iconColor}
              onChange={handleChange}
            />
            <span
              className={s["appearance__circle--mask"]}
              style={{ backgroundColor: helper.iconColor }}
            />
          </div>
        </div>
      </label>
    </form>
  );
};

export default LinkAppearance;
