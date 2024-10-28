import React, { useEffect, useState } from "react";
import CreateActivityButton from "../../components/Button/CreateActivityButton/CreateActivityButton";
import ParagraphCSS from "../../components/ParagraphCSS/ParagraphCSS";
import { ACTIVITY_TYPES } from "../../data/createActivityButtonData";
import { getLinks } from "../../services/linkService";
import LinksPage from "./LinksPage";

const demoItems = [
  {
    title: "Portfolio",
    url: "https://portfolio-v3-brown.vercel.app/",
    order: 2,
    id: 1,
  },
  {
    title: "Blue Wave",
    url: "https://bluewavelabs.ca",
    order: 1,
    id: 2,
  },
  {
    title: "Sequelize",
    url: "https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/",
    order: 3,
    id: 3,
  },
];

const LinksDefaultPage = () => {
  const [showLinksPage, setShowLinksPage] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!items?.length) {
      getLinks()
        .then((data) => {
          if (!data.length) {
            return Promise.all(
              demoItems.map(async (it, i) => {
                return await createLink({ ...it, order: i + 1 });
              })
            );
          }
          return data;
        })
        .then((data) => {
          setItems(data.sort((a, b) => a.order - b.order));
        });
    }
  }, []);

  const style = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={style}>
      {showLinksPage ? (
        <LinksPage items={items} setItems={setItems} />
      ) : (
        <>
          <ParagraphCSS />
          <CreateActivityButton
            type={ACTIVITY_TYPES.HELPERLINKS}
            onClick={() => {
              setShowLinksPage(true);
            }}
          />
        </>
      )}
    </div>
  );
};

export default LinksDefaultPage;
