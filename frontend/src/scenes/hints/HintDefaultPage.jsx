import CreateActivityButton from "../../components/Button/CreateActivityButton/CreateActivityButton";
import GuideMainPageTemplate from "../../templates/GuideMainPageTemplate/GuideMainPageTemplate";
import { ACTIVITY_TYPES_INFO } from "../../data/GuideMainPageData";
import HomePageTemplate from "../../templates/HomePageTemplate/HomePageTemplate";
import { ACTIVITY_TYPES } from "../../data/CreateActivityButtonData";
import ParagraphCSS from "../../components/ParagraphCSS/ParagraphCSS";
import { useNavigate } from "react-router";

const mockHints = [
  {
    idItem: 184293,
    title: "Main dashboard - feature hint",
    text: "This pops up the first time a user logs in to the dashboard.",
  },
  {
    idItem: 194294,
    title: "Main dashboard - password hint",
    text: "This pops up the first time a user logs in to the dashboard.",
  },
];

const HintDefaultPage = () => {
  const navigate = useNavigate();
  const style = {
    display: "flex",
    "flex-direction": "column",
    width: "100%",
    "justify-content": "center",
    "align-items": "center",
  };
  return (
    <HomePageTemplate>
      {mockHints.length === 0 ? (
        <div style={style}>
          <ParagraphCSS />
          <CreateActivityButton
            type={ACTIVITY_TYPES.HINTS}
            onClick={() => navigate("/hint/create")}
          />
        </div>
      ) : (
        <GuideMainPageTemplate
          items={mockHints}
          handleSelect={() => {}}
          handleDelete={() => {}}
          isPopupOpen={false}
          handleClosePopup={() => {}}
          type={ACTIVITY_TYPES_INFO.HINTS}
          onClick={() => navigate("/hint/create")}
        />
      )}
    </HomePageTemplate>
  );
};

export default HintDefaultPage;
