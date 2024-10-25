import PropTypes from "prop-types";
import React from "react";
import s from "./Preview.module.scss";

const Preview = ({ items }) => {
  return (
    <div className={s.card}>
      <div className={s.card__header}>
        Help center <button>X</button>
      </div>
      <ul className={s.card__links}>
        {items
          .sort((a, b) => a.order - b.order)
          .map((it) => (
            <li key={it.id}>
              <a href={it.url}>{it.title}</a>
            </li>
          ))}
      </ul>
      <div className={s.card__footer}>Powered by BlueWave Onboarding</div>
    </div>
  );
};

Preview.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  url: PropTypes.string,
  order: PropTypes.number,
};

export default Preview;
